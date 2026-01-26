import { 
  Sparkles, Droplets, CircleDot, Zap, Lightbulb, Sun,
  Shield, Wind, Wrench, Car, Gauge, CloudRain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExtraItem from './ExtraItem';
import { VehicleClass, vehicleClasses } from './VehicleSelection';

export interface ExteriorExtra {
  id: string;
  title: string;
  icon: typeof Sparkles;
  basePrice: number;
  maxQuantity: number;
  cabrioOnly?: boolean;
}

export const exteriorExtras: ExteriorExtra[] = [
  { id: 'flugrost', title: 'Flugrostentfernung (chemisch)', icon: Droplets, basePrice: 80, maxQuantity: 1 },
  { id: 'reifen-radhaus', title: 'Reifen & Radhaus-Intensivreinigung', icon: CircleDot, basePrice: 60, maxQuantity: 1 },
  { id: 'politur-1', title: 'One-Step-Politur', icon: Sparkles, basePrice: 450, maxQuantity: 1 },
  { id: 'politur-2', title: '2-Step-Politur', icon: Lightbulb, basePrice: 750, maxQuantity: 1 },
  { id: 'politur-3', title: '3-Step-Politur', icon: Zap, basePrice: 950, maxQuantity: 1 },
  { id: 'frontscheibe', title: 'Frontscheibenpolitur (Entfernung von Glas-Schmierfilm)', icon: Sun, basePrice: 80, maxQuantity: 1 },
  { id: 'kunststoff-aussen', title: 'Kunststoff-Aussenpflege', icon: Shield, basePrice: 60, maxQuantity: 1 },
  { id: 'endrohr', title: 'Endrohr- / Auspuffpolitur', icon: Gauge, basePrice: 50, maxQuantity: 1 },
  { id: 'keramik', title: 'Keramikversiegelung', icon: Shield, basePrice: 600, maxQuantity: 1 },
  { id: 'keramik-spray', title: 'Keramik-Spray-Versiegelung', icon: CloudRain, basePrice: 150, maxQuantity: 1 },
  { id: 'carnauba', title: 'Carnabauwachsversiegelung', icon: Sparkles, basePrice: 200, maxQuantity: 1 },
  { id: 'scheiben', title: 'Scheibenversiegelung', icon: Wind, basePrice: 100, maxQuantity: 1 },
  { id: 'cabrio-verdeck', title: 'Cabrioverdeck-Imprägnierung', icon: Car, basePrice: 120, maxQuantity: 1, cabrioOnly: true },
  { id: 'motorraum', title: 'Motorraum-Reinigung', icon: Wrench, basePrice: 110, maxQuantity: 1 },
  { id: 'unterboden', title: 'Unterbodenreinigung / Unterbodenwäsche', icon: Droplets, basePrice: 100, maxQuantity: 1 },
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

const formatPrice = (price: number): string => {
  return `CHF ${price.toLocaleString('de-CH')}`;
};

const ExteriorSelection = ({
  selectedVehicle,
  noExterior,
  onNoExteriorChange,
  exteriorDetail,
  onExteriorDetailChange,
  quantities,
  onQuantityChange,
}: ExteriorSelectionProps) => {
  const multiplier = vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1;
  const isCabrio = selectedVehicle?.includes('cabrio');
  
  const getPrice = (basePrice: number) => Math.round(basePrice * multiplier);

  const handleNoExteriorChange = (checked: boolean) => {
    onNoExteriorChange(checked);
    if (checked) {
      onExteriorDetailChange(false);
    }
  };

  const handleExteriorDetailChange = (checked: boolean) => {
    onExteriorDetailChange(checked);
    if (checked) {
      onNoExteriorChange(false);
    }
  };

  const visibleExtras = exteriorExtras.filter(extra => !extra.cabrioOnly || isCabrio);

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
            <p className="text-sm text-muted-foreground">Komplette Aussenaufbereitung</p>
            <p className="text-sm font-semibold text-primary">{formatPrice(getPrice(115))}</p>
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
            price={getPrice(extra.basePrice)}
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
