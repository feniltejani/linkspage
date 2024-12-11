'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });
const Links = dynamic(() => import('../components/Links'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll animations
    const initScrollAnimations = () => {
      // Scroll animation logic will go here
    };

    initScrollAnimations();
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          <Physics>
            <Scene />
          </Physics>
        </Canvas>
      </div>
      
      <div ref={containerRef} className="relative z-10">
        <Links />
      </div>
    </main>
  );
} 