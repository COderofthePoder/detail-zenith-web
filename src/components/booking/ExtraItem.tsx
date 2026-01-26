import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ExtraItemProps {
  id: string;
  title: string;
  icon: LucideIcon;
  price: number;
  quantity: number;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const formatPrice = (price: number): string => {
  return `CHF ${price.toLocaleString('de-CH')}`;
};

const ExtraItem = ({ 
  title, 
  icon: Icon, 
  price, 
  quantity, 
  maxQuantity,
  onIncrease, 
  onDecrease 
}: ExtraItemProps) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300",
      quantity > 0 
        ? "bg-primary/10 border-primary/50" 
        : "bg-secondary/30 border-transparent hover:bg-secondary/50"
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          quantity > 0 ? "bg-primary/20" : "bg-secondary"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            quantity > 0 ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-primary font-semibold">{formatPrice(price)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={quantity === 0}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            quantity > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/80"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          <Minus className="w-5 h-5" />
        </button>
        
        <span className="w-8 text-center font-bold text-lg">{quantity}</span>
        
        <button
          onClick={onIncrease}
          disabled={quantity >= maxQuantity}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            quantity < maxQuantity
              ? "bg-primary text-primary-foreground hover:bg-primary/80"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExtraItem;
