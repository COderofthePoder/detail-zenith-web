import { 
  Sparkles, Armchair, Droplets, Wind, Bug, Shield, 
  Baby, Dog, Layers, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExtraItem from './ExtraItem';
import { VehicleClass } from './VehicleSelection';
import {
  interiorDetailPrices,
  lederReinigungPrices,
  shampooStoffPrices,
  alcantaraPrices,
  fleckenGeruchPrices,
  kunststoffUVPrices,
  impraegnierungPrices,
  kindersitzPrice,
  tierhaarPrices,
  lederVersiegelungPrices,
  getExactPrice,
} from '@/lib/prices';

export interface InteriorExtra {
  id: string;
  title: string;
  icon: typeof Sparkles;
  priceTable: Record<VehicleClass, number> | number;
  maxQuantity: number;
}

export const interiorExtras: InteriorExtra[] = [
  { id: 'shampoo-stoff',      title: 'Shampoonierung von Stoffpolstern inkl. Extraktion', icon: Droplets,  priceTable: shampooStoffPrices,      maxQuantity: 1 },
  { id: 'leder-reinigung',    title: 'Leder-Tiefenreinigung & Lederpflege',               icon: Armchair,  priceTable: lederReinigungPrices,    maxQuantity: 1 },
  { id: 'alcantara',          title: 'Alcantara-Spezialreinigung',                         icon: Layers,    priceTable: alcantaraPrices,         maxQuantity: 1 },
  { id: 'flecken-geruch',     title: 'Flecken- & Geruchsentfernung (Getränke, Nikotin, Tiergerüche)', icon: Wind, priceTable: fleckenGeruchPrices, maxQuantity: 1 },
  { id: 'kunststoff-uv',      title: 'Kunststoff- & Gummipflege mit UV-Schutz',            icon: Shield,    priceTable: kunststoffUVPrices,      maxQuantity: 1 },
  { id: 'kindersitz',         title: 'Kindersitz-Reinigung',                               icon: Baby,      priceTable: kindersitzPrice,         maxQuantity: 5 },
  { id: 'tierhaar',           title: 'Tierhaar-Spezialentfernung',                         icon: Dog,       priceTable: tierhaarPrices,          maxQuantity: 1 },
  { id: 'impraegnierung',     title: 'Imprägnierung von Stoff- & Teppichflächen',          icon: Bug,       priceTable: impraegnierungPrices,    maxQuantity: 1 },
  { id: 'leder-versiegelung', title: 'Leder-Versiegelung',                                 icon: Lock,      priceTable: lederVersiegelungPrices, maxQuantity: 1 },
];

interface InteriorSelectionProps {
  selectedVehicle: VehicleClass | null;
  noInterior: boolean;
  onNoInteriorChange: (value: boolean) => void;
  interiorDetail: boolean;
  onInteriorDetailChange: (value: boolean) => void;
  quantities: Record<string, number>;
  onQuantityChange: (id: string, quantity: number) => void;
}

const formatPrice = (price: number): string => `CHF ${price.toLocaleString('de-CH')}`;

const InteriorSelection = ({
  selectedVehicle,
  noInterior,
  onNoInteriorChange,
  interiorDetail,
  onInteriorDetailChange,
  quantities,
  onQuantityChange,
}: InteriorSelectionProps) => {
  const getPrice = (table: Record<VehicleClass, number> | number): number => {
    if (!selectedVehicle) return 0;
    return getExactPrice(table, selectedVehicle);
  };

  const handleNoInteriorChange = (checked: boolean) => {
    onNoInteriorChange(checked);
    if (checked) onInteriorDetailChange(false);
  };

  const handleInteriorDetailChange = (checked: boolean) => {
    onInteriorDetailChange(checked);
    if (checked) onNoInteriorChange(false);
  };

  const interiorDetailPrice = selectedVehicle ? getExactPrice(interiorDetailPrices, selectedVehicle) : 0;

  return (
    <div className="animate-fade-up max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Innenreinigung</h2>
      <p className="text-muted-foreground text-center mb-8">Wähle deine gewünschten Innenreinigungs-Optionen</p>

      {/* Main Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <label
          className={cn(
            "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
            noInterior
              ? "bg-secondary border-foreground/20"
              : "bg-secondary/30 border-transparent hover:bg-secondary/50"
          )}
        >
          <Checkbox
            checked={noInterior}
            onCheckedChange={handleNoInteriorChange}
            className="w-6 h-6"
          />
          <div>
            <p className="font-semibold">Keine Innenreinigung</p>
            <p className="text-sm text-muted-foreground">Ich benötige keine Innenreinigung</p>
          </div>
        </label>

        <label
          className={cn(
            "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
            interiorDetail
              ? "bg-primary/10 border-primary"
              : "bg-secondary/30 border-transparent hover:bg-secondary/50"
          )}
        >
          <Checkbox
            checked={interiorDetail}
            onCheckedChange={handleInteriorDetailChange}
            className="w-6 h-6"
          />
          <div>
            <p className="font-semibold">Interior Detail</p>
            <p className="text-sm text-muted-foreground">Komplette Innenaufbereitung</p>
            <p className="text-sm font-semibold text-primary">{formatPrice(interiorDetailPrice)}</p>
          </div>
        </label>
      </div>

      {/* Extras */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Zusätzliche Extras
        </h3>

        {interiorExtras.map((extra) => (
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

export default InteriorSelection;
