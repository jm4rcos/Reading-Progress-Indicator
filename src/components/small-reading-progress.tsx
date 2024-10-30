import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Calculate how far the user has scrolled in the component
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.round((scrolled / documentHeight) * 100);
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="flex flex-col min-h-[200vh]">
      {/* Content to enable scrolling */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Scroll Down to Test</h1>
        {[...Array(20)].map((_, i) => (
          <p key={i} className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>

      {/* Fixed progress indicator */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2">
        <button className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded transition-colors">
          <span>Index</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <span className="min-w-[48px] text-right">{progress}%</span>
      </div>
    </div>
  );
};

export default ReadingProgress;