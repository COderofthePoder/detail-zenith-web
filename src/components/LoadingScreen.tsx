import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">DS-Detailing</span>
          </h2>
          <p className="text-muted-foreground text-sm">Professionelle Fahrzeugaufbereitung</p>
        </div>
        
        {/* Spinner */}
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    </div>
  );
};

export default LoadingScreen;
