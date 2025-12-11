'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Bottle3DProps {
  color: string;
  autoRotate?: boolean;
  className?: string;
}

function BottleModel({ color, autoRotate = true }: { color: string; autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Si un modèle 3D est disponible, on l'utilise, sinon on crée un modèle simple
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Création d'un modèle de bouteille simple (cylindre avec couvercle)
  return (
    <group>
      {/* Corps de la bouteille */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 1.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.2} />
      </mesh>
      
      {/* Couvercle */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.42, 0.4, 0.15, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
      </mesh>
      
      {/* Goulot */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Bottle3D({ color, autoRotate = true, className = '' }: Bottle3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <Environment preset="city" />
          <BottleModel color={color} autoRotate={autoRotate} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={1.5}
            maxDistance={4}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

