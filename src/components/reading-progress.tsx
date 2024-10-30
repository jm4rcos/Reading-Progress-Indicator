import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isTableOpen, setIsTableOpen] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      // Garantir que temos altura positiva para evitar NaN
      const scrolled = Math.max(window.scrollY, 0);
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight - windowHeight,
        1  // Evita divisão por zero
      );
      
      // Limitar progresso entre 0 e 100
      const calculatedProgress = Math.min(
        Math.max((scrolled / documentHeight) * 100, 0),
        100
      );
      
      setProgress(Math.round(calculatedProgress));
    };

    // Atualizar no scroll e no resize da janela
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Atualização inicial após um pequeno delay para garantir que o DOM está carregado
    setTimeout(updateProgress, 100);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsTableOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[200vh] relative">
      {/* Content */}
      <div className="p-8 max-w-3xl mx-auto">
        <h1 id="introduction" className="text-3xl font-bold mb-6">Design Guidelines</h1>
        
        <section id="visual-hierarchy" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">1. Visual Hierarchy</h2>
          <p className="mb-4">
            Using visual hierarchy principles such as size, color, and spacing guides users 
            to essential actions and information. Important buttons should be easily noticeable, 
            ensuring intuitive navigation.
          </p>
          {/* Adicionar mais parágrafos para garantir scroll */}
          {[...Array(3)].map((_, i) => (
            <p key={i} className="mb-4">
              Extended content about visual hierarchy principles and their importance in design.
              This helps ensure we have enough content to demonstrate the scroll functionality.
            </p>
          ))}
        </section>

        <section id="typography" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">2. Typography</h2>
          <p className="mb-4">
            Typography in web UI design is more than just choosing fonts. It's about creating 
            hierarchy and rhythm that guides readers through content while considering 
            web-safe fonts and accessibility.
          </p>
          {[...Array(3)].map((_, i) => (
            <p key={i} className="mb-4">
              Detailed explanation of typography principles, font selection, and their impact
              on readability and user experience in web design.
            </p>
          ))}
        </section>

        <section id="spacing" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">3. Spacing and Layout</h2>
          <p className="mb-4">
            Proper spacing and alignment enhance readability and make interfaces more 
            intuitive. Consistent margins and padding create visual harmony.
          </p>
          {[...Array(3)].map((_, i) => (
            <p key={i} className="mb-4">
              In-depth discussion of spacing principles, layout guidelines, and their role
              in creating balanced and harmonious user interfaces.
            </p>
          ))}
        </section>

        <section id="color" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">4. Color Theory</h2>
          <p className="mb-4">
            Understanding color psychology and accessibility ensures your design is both 
            aesthetically pleasing and functional for all users.
          </p>
          {[...Array(3)].map((_, i) => (
            <p key={i} className="mb-4">
              Comprehensive exploration of color theory, accessibility considerations,
              and practical applications in modern web design.
            </p>
          ))}
        </section>
      </div>

      {/* Fixed progress indicator and ToC */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Table of Contents */}
        {isTableOpen && (
          <div className="mb-4 bg-black/80 text-white p-4 rounded-lg w-64 backdrop-blur-sm">
            <h3 className="font-bold mb-2 text-sm uppercase">Table of Contents</h3>
            <ul className="space-y-2">
              {[
                { id: 'introduction', title: 'Introduction' },
                { id: 'visual-hierarchy', title: '1. Visual Hierarchy' },
                { id: 'typography', title: '2. Typography' },
                { id: 'spacing', title: '3. Spacing and Layout' },
                { id: 'color', title: '4. Color Theory' },
              ].map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-gray-200 hover:text-white transition-colors text-left w-full"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2">
          <button 
            onClick={() => setIsTableOpen(!isTableOpen)} 
            className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded transition-colors"
          >
            <span>Index</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${isTableOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <span className="min-w-[48px] text-right">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;