'use client';

import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />
      
      <Sphere ref={sphereRef} position={[-4, 2, -5]} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.5}
          metalness={0.8}
          envMapIntensity={1}
        />
      </Sphere>

      <Box ref={boxRef} position={[4, -2, -2]} args={[1, 1, 1]}>
        <meshStandardMaterial
          color="#e24a4a"
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ]}
          args={[0.05, 8, 8]}
        >
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2}
          />
        </Sphere>
      ))}
    </group>
  );
} 