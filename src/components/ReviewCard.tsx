import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const ReviewCard = ({ name, rating, text, date }: ReviewCardProps) => {
  return (
    <Card className="bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/90 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
