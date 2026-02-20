import {
  Sparkles, Droplets, CircleDot, Zap, Lightbulb, Sun,
  Shield, Wind, Wrench, Car, Gauge, CloudRain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExtraItem from './ExtraItem';
import { VehicleClass } from './VehicleSelection';
import {
  exteriorDetailPrices,
  flugrostPrices,
  reifenRadhausPrice,
  politur1Prices,
  politur2Prices,
  politur3Prices,
  frontscheibePrices,
  kunststoffAussenPrices,
  endrohPrices,
  keramikPrices,
  keramikSprayPrices,
  carnaubaPrices,
  scheibenPrices,
  motorPrices,
  unterbodenPrices,
  cabrioPrices,
  getExactPrice,
} from '@/lib/prices';

export interface ExteriorExtra {
  id: string;
  title: string;
  icon: typeof Sparkles;
  priceTable: Record<VehicleClass, number> | number;
  maxQuantity: number;
  cabrioOnly?: boolean;
}

export const exteriorExtras: ExteriorExtra[] = [
  { id: 'flugrost',        title: 'Flugrostentfernung (chemisch)',                        icon: Droplets,   priceTable: flugrostPrices,       maxQuantity: 1 },
  { id: 'reifen-radhaus',  title: 'Reifen & Radhaus-Intensivreinigung',                   icon: CircleDot,  priceTable: reifenRadhausPrice,   maxQuantity: 1 },
  { id: 'politur-1',       title: 'One-Step-Politur',                                     icon: Sparkles,   priceTable: politur1Prices,       maxQuantity: 1 },
  { id: 'politur-2',       title: '2-Step-Politur',                                       icon: Lightbulb,  priceTable: politur2Prices,       maxQuantity: 1 },
  { id: 'politur-3',       title: '3-Step-Politur',                                       icon: Zap,        priceTable: politur3Prices,       maxQuantity: 1 },
  { id: 'frontscheibe',    title: 'Frontscheibenpolitur (Entfernung von Glas-Schmierfilm)', icon: Sun,      priceTable: frontscheibePrices,   maxQuantity: 1 },
  { id: 'kunststoff-aussen', title: 'Kunststoff-Aussenpflege',                            icon: Shield,     priceTable: kunststoffAussenPrices, maxQuantity: 1 },
  { id: 'endrohr',         title: 'Endrohr- / Auspuffpolitur',                            icon: Gauge,      priceTable: endrohPrices,         maxQuantity: 1 },
  { id: 'keramik',         title: 'Keramikversiegelung',                                  icon: Shield,     priceTable: keramikPrices,        maxQuantity: 1 },
  { id: 'keramik-spray',   title: 'Keramik-Spray-Versiegelung',                           icon: CloudRain,  priceTable: keramikSprayPrices,   maxQuantity: 1 },
  { id: 'carnauba',        title: 'Carnabauwachsversiegelung',                            icon: Sparkles,   priceTable: carnaubaPrices,       maxQuantity: 1 },
  { id: 'scheiben',        title: 'Scheibenversiegelung',                                 icon: Wind,       priceTable: scheibenPrices,       maxQuantity: 1 },
  { id: 'cabrio-verdeck',  title: 'Cabrioverdeck-Imprägnierung',                          icon: Car,        priceTable: cabrioPrices,         maxQuantity: 1, cabrioOnly: true },
  { id: 'motorraum',       title: 'Motorraum-Reinigung',                                  icon: Wrench,     priceTable: motorPrices,          maxQuantity: 1 },
  { id: 'unterboden',      title: 'Unterbodenreinigung / Unterbodenwäsche',               icon: Droplets,   priceTable: unterbodenPrices,     maxQuantity: 1 },
];

interface ExteriorSelectionProps {
  selectedVehicle: VehicleClass | null;
  noExterior: boolean;
  onNoExteriorChange: (value: boolean) => void;
  exteriorDetail: boolean;
  onExteriorDetailChange: (value: boolean) => void;
  quantities: Record<string, number>;
  onQuantityChange: (id: string, quantity: number) => void;
}

const formatPrice = (price: number): string => `CHF ${price.toLocaleString('de-CH')}`;

const ExteriorSelection = ({
  selectedVehicle,
  noExterior,
  onNoExteriorChange,
  exteriorDetail,
  onExteriorDetailChange,
  quantities,
  onQuantityChange,
}: ExteriorSelectionProps) => {
  const isCabrio = selectedVehicle?.includes('cabrio');

  const getPrice = (table: Record<VehicleClass, number> | number): number => {
    if (!selectedVehicle) return 0;
    return getExactPrice(table, selectedVehicle);
  };

  const handleNoExteriorChange = (checked: boolean) => {
    onNoExteriorChange(checked);
    if (checked) onExteriorDetailChange(false);
  };

  const handleExteriorDetailChange = (checked: boolean) => {
    onExteriorDetailChange(checked);
    if (checked) onNoExteriorChange(false);
  };

  const visibleExtras = exteriorExtras.filter(extra => !extra.cabrioOnly || isCabrio);
  const extDetailPrice = selectedVehicle ? getExactPrice(exteriorDetailPrices, selectedVehicle) : 0;

  return (
    <div className="animate-fade-up max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Aussenreinigung</h2>
      <p className="text-muted-foreground text-center mb-8">Wähle deine gewünschten Aussenreinigungs-Optionen</p>

      {/* Main Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <label
          className={cn(
            "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
            noExterior
              ? "bg-secondary border-foreground/20"
              : "bg-secondary/30 border-transparent hover:bg-secondary/50"
          )}
        >
          <Checkbox
            checked={noExterior}
            onCheckedChange={handleNoExteriorChange}
            className="w-6 h-6"
          />
          <div>
            <p className="font-semibold">Keine Aussenreinigung</p>
            <p className="text-sm text-muted-foreground">Ich benötige keine Aussenreinigung</p>
          </div>
        </label>

        <label
          className={cn(
            "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
            exteriorDetail
              ? "bg-primary/10 border-primary"
              : "bg-secondary/30 border-transparent hover:bg-secondary/50"
          )}
        >
          <Checkbox
            checked={exteriorDetail}
            onCheckedChange={handleExteriorDetailChange}
            className="w-6 h-6"
          />
          <div>
            <p className="font-semibold">Exterior Detail</p>
            <p className="text-sm text-muted-foreground">Aussenaufbereitung</p>
            <p className="text-sm font-semibold text-primary">{formatPrice(extDetailPrice)}</p>
          </div>
        </label>
      </div>

      {/* Extras */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Zusätzliche Extras
        </h3>

        {visibleExtras.map((extra) => (
          <ExtraItem
            key={extra.id}
            id={extra.id}
            title={extra.title}
            icon={extra.icon}
            price={getPrice(extra.priceTable)}
            quantity={quantities[extra.id] || 0}
            maxQuantity={extra.maxQuantity}
            onIncrease={() => onQuantityChange(extra.id, (quantities[extra.id] || 0) + 1)}
            onDecrease={() => onQuantityChange(extra.id, Math.max(0, (quantities[extra.id] || 0) - 1))}
          />
        ))}
      </div>
    </div>
  );
};

export default ExteriorSelection;
