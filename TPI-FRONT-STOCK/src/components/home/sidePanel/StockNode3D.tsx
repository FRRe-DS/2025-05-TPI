import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const StockNode3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  // Animación básica de rotación suave
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        {/* Una forma icosaédrica se ve más tecnológica que un cubo simple */}
        <icosahedronGeometry args={[2.5, 0]} /> 
        <MeshDistortMaterial
          color={hovered ? "#6366f1" : "#4338ca"} // Indigo interactivo
          attach="material"
          distort={0.4} // Efecto de distorsión "líquida" o tecnológica
          speed={2}
          roughness={0.2}
          metalness={0.8} // Acabado metálico moderno
        />
      </mesh>
    </Float>
  );
};