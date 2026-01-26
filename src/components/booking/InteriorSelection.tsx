import { 
  Sparkles, Armchair, Droplets, Wind, Bug, Shield, 
  Baby, Dog, Layers, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExtraItem from './ExtraItem';
import { VehicleClass, vehicleClasses } from './VehicleSelection';

export interface InteriorExtra {
  id: string;
  title: string;
  icon: typeof Sparkles;
  basePrice: number;
  maxQuantity: number;
}

export const interiorExtras: InteriorExtra[] = [
  { id: 'shampoo-stoff', title: 'Shampoonierung von Stoffpolstern inkl. Extraktion', icon: Droplets, basePrice: 80, maxQuantity: 1 },
  { id: 'leder-reinigung', title: 'Leder-Tiefenreinigung & Lederpflege', icon: Armchair, basePrice: 120, maxQuantity: 1 },
  { id: 'alcantara', title: 'Alcantara-Spezialreinigung', icon: Layers, basePrice: 100, maxQuantity: 1 },
  { id: 'flecken-geruch', title: 'Flecken- & Geruchsentfernung (Getränke, Nikotin, Tiergerüche)', icon: Wind, basePrice: 90, maxQuantity: 1 },
  { id: 'kunststoff-uv', title: 'Kunststoff- & Gummipflege mit UV-Schutz', icon: Shield, basePrice: 50, maxQuantity: 1 },
  { id: 'kindersitz', title: 'Kindersitz-Reinigung', icon: Baby, basePrice: 35, maxQuantity: 5 },
  { id: 'tierhaar', title: 'Tierhaar-Spezialentfernung', icon: Dog, basePrice: 100, maxQuantity: 1 },
  { id: 'impraegnierung', title: 'Imprägnierung von Stoff- & Teppichflächen', icon: Bug, basePrice: 80, maxQuantity: 1 },
  { id: 'leder-versiegelung', title: 'Leder-Versiegelung', icon: Lock, basePrice: 150, maxQuantity: 1 },
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

const formatPrice = (price: number): string => {
  return `CHF ${price.toLocaleString('de-CH')}`;
};

const InteriorSelection = ({
  selectedVehicle,
  noInterior,
  onNoInteriorChange,
  interiorDetail,
  onInteriorDetailChange,
  quantities,
  onQuantityChange,
}: InteriorSelectionProps) => {
  const multiplier = vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1;
  
  const getPrice = (basePrice: number) => Math.round(basePrice * multiplier);

  const handleNoInteriorChange = (checked: boolean) => {
    onNoInteriorChange(checked);
    if (checked) {
      onInteriorDetailChange(false);
    }
  };

  const handleInteriorDetailChange = (checked: boolean) => {
    onInteriorDetailChange(checked);
    if (checked) {
      onNoInteriorChange(false);
    }
  };

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
            <p className="text-sm font-semibold text-primary">{formatPrice(getPrice(149))}</p>
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

export default InteriorSelection;
