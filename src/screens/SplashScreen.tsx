import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-primary to-[#0EA5E9] flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-white blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-32 h-32 glass-card flex items-center justify-center mb-8"
      >
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-primary text-4xl font-bold">ZN</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-3xl font-bold tracking-tight mb-2"
      >
        ZYNROVA Nest
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-white/80 text-center px-12 text-lg leading-tight"
      >
        Everything You Need,<br />Delivered Inside Your Apartment
      </motion.p>

      <div className="absolute bottom-20 w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full w-full bg-white"
        />
      </div>
    </div>
  );
}
