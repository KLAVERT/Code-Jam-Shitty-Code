import React, { useState, useRef, useEffect } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const OilCheckSection = (props: any) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTips(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkSteps = [
    {
      number: 1,
      title: "Park on Level Ground",
      description: "Ensure your car is parked on a flat, level surface. Turn off the engine and wait 5-10 minutes to allow the oil to settle back into the pan.",
      icon: "🚗",
      warning: "Never check oil immediately after running the engine!"
    },
    {
      number: 2,
      title: "Locate the Dipstick",
      description: "Open your hood and locate the oil dipstick. It usually has a brightly colored handle (often yellow or orange) and is marked with 'Engine Oil'.",
      icon: "🔍",
      warning: "Don't confuse it with the transmission dipstick!"
    },
    {
      number: 3,
      title: "Remove and Clean",
      description: "Pull out the dipstick completely and wipe it clean with a lint-free cloth or paper towel. This ensures an accurate reading.",
      icon: "🧹",
      warning: "Make sure the cloth is clean to avoid contamination."
    },
    {
      number: 4,
      title: "Check the Level",
      description: "Reinsert the dipstick fully, then remove it again. Check where the oil level sits between the MIN and MAX marks. The oil should be between these two indicators.",
      icon: "📏",
      warning: "Low oil levels can cause serious engine damage!"
    },
    {
      number: 5,
      title: "Add Oil if Needed",
      description: "If the level is below the MIN mark, add oil gradually. Check the level frequently to avoid overfilling. Use the correct oil grade specified in your owner's manual.",
      icon: "⛽",
      warning: "Overfilling can be as harmful as underfilling!"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    const element = document.getElementById(`step-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    console.log('Step clicked:', index);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black min-h-screen py-20">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 184, 0, 0.1) 35px, rgba(255, 184, 0, 0.1) 70px)',
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
            How to Check Your{" "}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Motor Oil Level
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Regular oil checks are essential for maintaining your engine's health. 
            Learn the proper technique to ensure your engine stays protected.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                />

                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  className="w-full h-auto"
                  style={{
                    opacity: videoLoaded ? 1 : 0,
                    transition: 'opacity 0.5s',
                    // Bad practice: Inline filter
                    filter: 'brightness(0.85) saturate(1.2)',
                  }}
                >
                  <source src="/videos/vecteezy_automotive-oil-level-gauge-soft-focus-shallow-focus-effect_8084899.mov" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>

                {!videoLoaded && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black"
                    style={{ minHeight: '400px' }}
                  >
                    <div className="text-amber-500 text-xl">Loading video...</div>
                  </div>
                )}

                <div 
                  className="absolute bottom-4 right-4 z-20"
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 184, 0, 0.4)'
                  }}
                >
                  <span className="text-amber-500 text-sm font-bold">📊 OIL LEVEL CHECK</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  onClick={() => alert('This would open a detailed video tutorial')}
                  variant="outline"
                  className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                >
                  Watch Full Tutorial
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              {checkSteps.map((step, index) => (
                <Card
                  key={index}
                  id={`step-${index}`}
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/50 shadow-lg shadow-amber-500/20'
                      : 'bg-black/50 border-gray-800 hover:border-amber-500/30'
                  }`}
                  onClick={() => handleStepClick(index)}
                  style={{
                    transform: activeStep === index ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0"
                      style={{
                        fontSize: '2.5rem',
                        filter: activeStep === index ? 'grayscale(0)' : 'grayscale(0.5)',
                      }}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{
                            background: activeStep === index ? '#FFB800' : '#444',
                            color: activeStep === index ? '#000' : '#999'
                          }}
                        >
                          STEP {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>

                      <p className="text-gray-400 mb-3 leading-relaxed">
                        {step.description}
                      </p>

                      <div 
                        className="flex items-start gap-2 p-3 rounded-lg"
                        style={{
                          background: 'rgba(255, 184, 0, 0.1)',
                          border: '1px solid rgba(255, 184, 0, 0.2)'
                        }}
                      >
                        <span className="text-amber-500">⚠️</span>
                        <p className="text-amber-500 text-sm">
                          {step.warning}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Pro Tips for Oil Maintenance
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Check Regularly",
                    content: "Check your oil level at least once a month and before long trips.",
                    icon: "📅"
                  },
                  {
                    title: "Know Your Oil Type",
                    content: "Always use the oil grade recommended in your owner's manual.",
                    icon: "📖"
                  },
                  {
                    title: "Watch for Leaks",
                    content: "Check for oil spots under your car - this could indicate a leak.",
                    icon: "💧"
                  }
                ].map((tip, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">{tip.icon}</div>
                    <h4 className="text-white font-bold mb-2">{tip.title}</h4>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => {
                    console.log('Download clicked');
                    alert('This would download a PDF checklist');
                    localStorage.setItem('downloadClicked', 'true');
                  }}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600"
                >
                  Download Oil Check Checklist
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OilCheckSection;
