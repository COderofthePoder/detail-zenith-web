import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <Card
      className="group bg-background/80 backdrop-blur-md border-border/50 hover:border-primary/50 hover:bg-background/90 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
