'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function AirPod({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      {/* AirPod body */}
      <capsuleGeometry args={[0.15, 0.8, 4, 8]} />
      <meshStandardMaterial color="#f8f8f8" metalness={0.1} roughness={0.2} />
      
      {/* Speaker part */}
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.2} roughness={0.3} />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.2} />
      </mesh>
    </mesh>
  );
}

function Scene({ variant = 'pro' }: { variant?: 'pro' | 'max' | 'standard' }) {
  if (variant === 'max') {
    return (
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        {/* AirPods Max - Over-ear headphones */}
        <group>
          {/* Headband */}
          <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[1.2, 0.08, 8, 16]} />
            <meshStandardMaterial color="#2c2c2c" metalness={0.3} roughness={0.2} />
          </mesh>
          
          {/* Left ear cup */}
          <mesh position={[-0.8, 0.2, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.1} />
          </mesh>
          
          {/* Right ear cup */}
          <mesh position={[0.8, 0.2, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.1} />
          </mesh>
          
          {/* Connecting arms */}
          <mesh position={[-0.6, 0.6, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
            <meshStandardMaterial color="#2c2c2c" metalness={0.3} roughness={0.2} />
          </mesh>
          <mesh position={[0.6, 0.6, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
            <meshStandardMaterial color="#2c2c2c" metalness={0.3} roughness={0.2} />
          </mesh>
        </group>
      </PresentationControls>
    );
  }

  return (
    <PresentationControls
      global
      rotation={[0.2, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <group>
        <AirPod position={[-0.3, 0, 0]} rotation={[0, 0, 0]} />
        <AirPod position={[0.3, 0, 0]} rotation={[0, Math.PI, 0]} />
        
        {/* Case (for Pro version) */}
        {variant === 'pro' && (
          <mesh position={[0, -1.2, 0]}>
            <boxGeometry args={[1, 0.4, 0.8]} />
            <meshStandardMaterial color="#f8f8f8" metalness={0.1} roughness={0.2} />
          </mesh>
        )}
      </group>
    </PresentationControls>
  );
}

export default function AirPodsModel({ 
  variant = 'pro',
  className = "w-full h-64" 
}: { 
  variant?: 'pro' | 'max' | 'standard';
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost, attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  return (
    <div className={className}>
      <Canvas 
        ref={canvasRef}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost');
          });
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} />
        <Scene variant={variant} />
      </Canvas>
    </div>
  );
}