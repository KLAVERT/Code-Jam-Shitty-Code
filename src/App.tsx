import React from 'react';
import { HeroSection } from './sections/HeroSection';
import OilProductsSection from './sections/OilProductsSection';
import ImportanceSection from './sections/ImportanceSection';
import OilCheckSection from './sections/OilCheckSection';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ImportanceSection />
      <OilCheckSection />
      <OilProductsSection />
    </div>
  );
}

export default App;