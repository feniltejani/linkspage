'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Link {
  title: string;
  url: string;
  icon?: string;
}

export default function Links() {
  const [isLoading, setIsLoading] = useState(true);
  const links: Link[] = [
    { title: 'Portfolio', url: '#', icon: '🎨' },
    { title: 'GitHub', url: '#', icon: '💻' },
    { title: 'LinkedIn', url: '#', icon: '👔' },
    { title: 'Twitter', url: '#', icon: '🐦' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ width: '3rem', height: '3rem' }}
          className="border-4 border-white rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        style={{ minHeight: '100vh' }}
        className="flex items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl w-full space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={link.url}
                className="glass-card block w-full text-center text-xl"
              >
                <span className="mr-2">{link.icon}</span>
                {link.title}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 