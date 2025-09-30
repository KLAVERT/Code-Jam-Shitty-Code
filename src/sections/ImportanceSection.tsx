import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";

const ImportanceSection = (props: any) => {
  const [activeTab, setActiveTab] = useState('protection');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const importanceData = {
    protection: {
      title: "Engine Protection",
      content: "The right motor oil creates a protective barrier between moving parts, preventing metal-to-metal contact and reducing wear. Without proper lubrication, engine components can suffer severe damage, leading to costly repairs or complete engine failure.",
      stats: {
        wearReduction: "85%",
        engineLife: "2x longer",
        maintenance: "50% less"
      }
    },
    performance: {
      title: "Enhanced Performance",
      content: "Quality motor oil improves engine efficiency by reducing friction and helping remove heat from critical components. This leads to better fuel economy, increased horsepower, and smoother operation across all temperature ranges.",
      stats: {
        fuelEconomy: "+5%",
        horsepower: "+3%",
        efficiency: "+10%"
      }
    },
    longevity: {
      title: "Engine Longevity",
      content: "Using the correct grade and quality of motor oil significantly extends your engine's lifespan. Modern oils contain additives that clean, cool, and protect your engine, preventing sludge buildup and maintaining optimal performance.",
      stats: {
        engineLife: "+40%",
        reliability: "95%",
        protection: "24/7"
      }
    }
  };

  return (
    <section className="relative bg-black min-h-screen py-20 overflow-hidden">
      {/* Bad practice: Inline styles */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, #FFB800 0%, transparent 70%)',
          pointerEvents: 'none'
        }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose the{" "}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Right Motor Oil
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Your engine's performance and longevity depend heavily on using the correct motor oil.
            Learn why making the right choice is crucial for your vehicle.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)',
              }}
            />
            
            <div 
              className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
              style={{
                border: '2px solid rgba(255, 184, 0, 0.3)',
                boxShadow: 'inset 0 0 60px rgba(255, 184, 0, 0.1)'
              }}
            />

            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className="w-full h-auto"
              style={{
                opacity: isVideoLoaded ? 1 : 0,
                transition: 'opacity 0.5s',
                // Bad practice: Hardcoded filter
                filter: 'brightness(0.9) contrast(1.1)',
              }}
            >
              <source src="/videos/vecteezy_car-engine-piston-4-stroke-cycle_70397325.mp4" type="video/mp4" />
            </video>

            {!isVideoLoaded && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black"
                style={{ minHeight: '400px' }}
              >
                <div className="text-amber-500 text-xl">Loading engine animation...</div>
              </div>
            )}

            <div 
              className="absolute top-4 left-4 z-30"
              style={{
                padding: '8px 16px',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 184, 0, 0.3)'
              }}
            >
              <span className="text-amber-500 text-sm font-bold">● LIVE ENGINE</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(importanceData).map(([key, data]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: key === 'protection' ? 0 : key === 'performance' ? 0.2 : 0.4 }}
              className={`cursor-pointer p-6 rounded-lg transition-all duration-300 border ${
                activeTab === key 
                  ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/50' 
                  : 'bg-black/50 border-gray-800 hover:border-amber-500/30 hover:bg-black/70'
              }`}
              onClick={() => setActiveTab(key)}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{data.content}</p>
              
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(data.stats).map(([statKey, value]) => (
                  <div key={statKey} className="text-center">
                    <div className="text-amber-500 text-xl font-bold">{value}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide">
                      {statKey.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => alert('This would show more information in a proper implementation')}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
          >
            Learn More About Oil Types
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImportanceSection;