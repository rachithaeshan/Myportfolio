import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function GoldenOrb() {
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = 1.2 + Math.sin(t * 0.2) * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      {/* Core orb */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.4, 64, 64]} />
          <MeshDistortMaterial
            color="#1A1208"
            emissive="#C6A969"
            emissiveIntensity={0.08}
            metalness={0.9}
            roughness={0.1}
            distort={0.15}
            speed={1.5}
            envMapIntensity={1}
          />
        </mesh>

        {/* Gold wireframe overlay */}
        <mesh>
          <sphereGeometry args={[1.42, 16, 16]} />
          <meshBasicMaterial color="#C6A969" wireframe opacity={0.06} transparent />
        </mesh>

        {/* Emerald inner glow sphere */}
        <mesh>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshBasicMaterial color="#335C4A" opacity={0.15} transparent />
        </mesh>
      </Float>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.0, 0.008, 8, 120]} />
        <meshBasicMaterial color="#C6A969" opacity={0.5} transparent />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[2.4, 0.004, 8, 120]} />
        <meshBasicMaterial color="#335C4A" opacity={0.4} transparent />
      </mesh>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <OrbitalDot key={i} index={i} radius={2.0} />
      ))}
    </group>
  );
}

function OrbitalDot({ index, radius }) {
  const ref = useRef();
  const speed = 0.3 + index * 0.05;
  const offset = (index / 6) * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5 + offset) * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={index % 2 === 0 ? "#C6A969" : "#335C4A"} />
    </mesh>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#C6A969" opacity={0.4} transparent sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#C6A969" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#335C4A" />
        <GoldenOrb />
        <Particles />
        <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
