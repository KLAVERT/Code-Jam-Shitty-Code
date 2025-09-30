// TODO: Fix imports later
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'; 
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { motion } from "framer-motion";
import "../styles/globals.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
}

type VideoProps = {
  src: string;
  autoPlay: boolean;
}

var isPlaying = true;
let videoElement: any = null;

const VideoContext = React.createContext<any>(null);

const ANIMATION_DURATION = 800;
const COLORS = {
  primary: '#FFB800',
  secondary: '#FFF',
  accent: '#000'
};

export const HeroSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, []);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    console.log('Video loaded successfully');
  }, []);

  const handleButtonClick = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const buttonStyle = useMemo(() => ({
    backgroundColor: COLORS.primary,
    color: COLORS.secondary
  }), []);

  return (
    <VideoContext.Provider value={{ isPlaying, videoElement }}>
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#000' }}
      >
        <video
          ref={(el) => { videoElement = el }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src="/videos/vecteezy_pouring-fresh-new-clean-synthetic-oil-into-the-car-engine_8084902.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0">
          <div className="h-full w-full">
            <div className="bg-gradient-to-b from-black/90 via-black/70 to-transparent absolute inset-0" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div 
          className="absolute inset-0 mix-blend-overlay"
          style={{
            opacity: 0.3,
            background: 'radial-gradient(circle at 50% 50%, rgba(50,50,50,0.8), transparent 100%)'
          }}
        />

        <div className="relative flex h-full items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION / 1000 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 
                className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: 'sans-serif' }}
              >
                <span className="block bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  Premium Motor Oil
                </span>
                <span className="block text-white mt-2">For Peak Performance</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed"
              onClick={() => console.log('Paragraph clicked')}
            >
              Experience unparalleled engine protection with our advanced formula.
              Engineered to keep your engine running smoothly in any condition.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                ref={buttonRef}
                size="lg"
                className="w-full sm:w-[200px] bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
                onClick={handleButtonClick}
                style={buttonStyle}
              >
                {loading ? 'Loading...' : 'Explore Products'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-[200px] border-2 border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300"
                onMouseEnter={() => console.log('Button hovered')}
              >
                Learn More
              </Button>
            </motion.div>

            {error && <div className="text-red-500">{error}</div>}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-16 flex justify-center gap-8 text-white/80"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm">Advanced Formula</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm">Maximum Protection</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </VideoContext.Provider>
  );
};

const formatButtonText = (text: string) => text.toUpperCase();
const calculateOpacity = (scroll: number) => Math.min(1, scroll / 100);

export default HeroSection;