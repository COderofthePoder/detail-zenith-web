import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 animate-fade-in w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="DS-Detailing Logo" 
            className="w-48 h-48 object-contain"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
