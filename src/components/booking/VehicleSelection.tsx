import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

export type VehicleClass = 
  | 'kleinwagen' 
  | 'limousine' 
  | 'coupe-2' 
  | 'coupe-4' 
  | 'cabrio-2' 
  | 'cabrio-4' 
  | 'kombi' 
  | 'compact-suv' 
  | 'suv' 
  | 'pickup' 
  | 'minivan' 
  | 'bus';

export const vehicleClasses: { id: VehicleClass; label: string; multiplier: number }[] = [
  { id: 'kleinwagen', label: 'Kleinwagen', multiplier: 0.85 },
  { id: 'limousine', label: 'Limousine', multiplier: 1.0 },
  { id: 'coupe-2', label: 'Coupé 2-Sitzer', multiplier: 0.95 },
  { id: 'coupe-4', label: 'Coupé 4-Sitzer', multiplier: 1.0 },
  { id: 'cabrio-2', label: 'Cabrio 2-Sitzer', multiplier: 1.0 },
  { id: 'cabrio-4', label: 'Cabrio 4-Sitzer', multiplier: 1.05 },
  { id: 'kombi', label: 'Kombi', multiplier: 1.1 },
  { id: 'compact-suv', label: 'Kompakt-SUV', multiplier: 1.1 },
  { id: 'suv', label: 'SUV (bis 7-Sitzer)', multiplier: 1.25 },
  { id: 'pickup', label: 'Pickup', multiplier: 1.25 },
  { id: 'minivan', label: 'Minivan', multiplier: 1.25 },
  { id: 'bus', label: 'Bus', multiplier: 1.4 },
];

interface VehicleSelectionProps {
  selectedVehicle: VehicleClass | null;
  onSelect: (vehicle: VehicleClass) => void;
}

const VehicleSelection = ({ selectedVehicle, onSelect }: VehicleSelectionProps) => {
  return (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold mb-6 text-center">Wähle deine Fahrzeugklasse</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {vehicleClasses.map((vc) => (
          <button
            key={vc.id}
            onClick={() => onSelect(vc.id)}
            className={cn(
              "p-4 rounded-xl font-medium transition-all duration-300 border-2",
              selectedVehicle === vc.id
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-secondary/50 hover:bg-secondary border-transparent text-foreground"
            )}
          >
            <Car className="w-8 h-8 mx-auto mb-2 opacity-70" />
            <span className="text-sm">{vc.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;
