import { Star, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  date: string;
  isVerifiedMember?: boolean;
}

const ReviewCard = ({ name, rating, text, date, isVerifiedMember }: ReviewCardProps) => {
  return (
    <Card className="bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/90 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{name}</h4>
              {isVerifiedMember && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verifiziertes Mitglied
                </span>
              )}
            </div>
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
