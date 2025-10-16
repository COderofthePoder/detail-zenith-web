import { useEffect, useState } from 'react';

const SectionBlur = () => {
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY + windowHeight / 2;

      let maxBlur = 0;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        const sectionMiddle = (sectionTop + sectionBottom) / 2;

        // Calculate distance from section middle
        const distance = Math.abs(scrollY - sectionMiddle);
        const sectionHalfHeight = rect.height / 2;

        // Create blur effect at section boundaries
        if (distance < sectionHalfHeight) {
          const normalizedDistance = distance / sectionHalfHeight;
          // Blur is strongest at the boundaries (0.3 to 0.7 of the distance)
          let blur = 0;
          if (normalizedDistance > 0.3 && normalizedDistance < 0.7) {
            const adjustedDistance = (normalizedDistance - 0.3) / 0.4;
            blur = Math.sin(adjustedDistance * Math.PI) * 8; // Max blur of 8px
          }
          maxBlur = Math.max(maxBlur, blur);
        }
      });

      setBlurAmount(maxBlur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (blurAmount === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-all duration-200"
      style={{
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
    />
  );
};

export default SectionBlur;
