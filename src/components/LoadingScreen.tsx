import logo from '@/assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 animate-fade-in w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="DS-Detailing Logo" 
            className="w-72 h-72 object-contain"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-accent animate-[loading-bar_2s_ease-out_forwards]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
