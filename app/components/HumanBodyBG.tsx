"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function OrbitRing({ radius, color, speed, tilt }: { radius: number; color: string; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 12, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
}

function DataNode({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8 + offset) * 0.09;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.95} />
    </mesh>
  );
}

function HumanBodyScene() {
  const bodyRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const baseParticlePositions = useMemo(() => {
    const positions = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      positions[i * 3]     = THREE.MathUtils.randFloatSpread(24);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(16);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(24);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bodyRef.current) bodyRef.current.rotation.y = Math.sin(t * 0.2) * 0.28;
    if (heartRef.current) {
      const pulse = 1 + (Math.sin((t / 0.75) * Math.PI * 2) * 0.18 + 0.18) / 2;
      heartRef.current.scale.setScalar(pulse);
    }
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i]     = baseParticlePositions[i];
        pos[i + 1] = baseParticlePositions[i + 1] + Math.sin(t * 0.3 + baseParticlePositions[i] * 0.6) * 0.1;
        pos[i + 2] = baseParticlePositions[i + 2];
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Yellow for gold, purple for purple — matching the new theme
  const gold   = "#f59e0b";
  const purple = "#a855f7";
  const red    = "#ef4444";

  const dataNodes: Array<{ pos: [number, number, number]; color: string }> = [
    { pos: [0.35, 0.38, 0.6],  color: red    },
    { pos: [-0.5, 0.15, 0.55], color: gold   },
    { pos: [0.55, -0.0, 0.5],  color: purple },
    { pos: [0, -0.85, 0.4],    color: gold   },
    { pos: [-0.3, 0.65, 0.6],  color: purple },
  ];

  const wireMat = (color: string, opacity = 0.13) => ({
    color, emissive: color, emissiveIntensity: 0.9, transparent: true, opacity, wireframe: true,
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 8, 5]} intensity={1.4} color={gold} />
      <pointLight position={[-4, 3, 4]} intensity={0.9} color={purple} />
      <pointLight position={[0, -4, 6]} intensity={0.4} color={gold} />

      {/* Orbit rings — gold + purple */}
      <OrbitRing radius={2.2} color={gold}   speed={0.13}  tilt={Math.PI / 5} />
      <OrbitRing radius={2.7} color={purple} speed={-0.09} tilt={Math.PI / 3} />
      <OrbitRing radius={1.8} color={gold}   speed={0.22}  tilt={Math.PI / 2.2} />

      <group ref={bodyRef} position={[0, -0.4, 0]}>
        {/* Inner body glow */}
        <mesh position={[0, 0.0, 0]}>
          <capsuleGeometry args={[0.82, 1.9, 8, 20]} />
          <meshStandardMaterial color={purple} emissive={purple} emissiveIntensity={0.35} transparent opacity={0.05} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.72, 0]}>
          <sphereGeometry args={[0.58, 28, 28]} />
          <meshStandardMaterial {...wireMat(gold)} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 1.14, 0]}>
          <cylinderGeometry args={[0.18, 0.24, 0.28, 16]} />
          <meshStandardMaterial {...wireMat(gold, 0.1)} />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.72, 0.82, 1.9, 28, 3, true]} />
          <meshStandardMaterial {...wireMat(gold, 0.14)} />
        </mesh>
        {/* Hips */}
        <mesh position={[0, -0.78, 0]}>
          <sphereGeometry args={[0.7, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial {...wireMat(gold, 0.1)} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-1.1, 0.5, 0]} rotation={[0, 0, Math.PI / 7]}>
          <capsuleGeometry args={[0.2, 1.6, 8, 12]} />
          <meshStandardMaterial {...wireMat(purple, 0.09)} />
        </mesh>
        {/* Right arm */}
        <mesh position={[1.1, 0.5, 0]} rotation={[0, 0, -Math.PI / 7]}>
          <capsuleGeometry args={[0.2, 1.6, 8, 12]} />
          <meshStandardMaterial {...wireMat(purple, 0.09)} />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.34, -1.8, 0]} rotation={[0, 0, Math.PI / 22]}>
          <capsuleGeometry args={[0.22, 2.2, 8, 12]} />
          <meshStandardMaterial {...wireMat(purple, 0.09)} />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.34, -1.8, 0]} rotation={[0, 0, -Math.PI / 22]}>
          <capsuleGeometry args={[0.22, 2.2, 8, 12]} />
          <meshStandardMaterial {...wireMat(purple, 0.09)} />
        </mesh>

        {/* Heart */}
        <group ref={heartRef} position={[0.22, 0.52, 0.42]}>
          <mesh position={[-0.12, 0, 0]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={red} emissive={red} emissiveIntensity={2} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.12, 0, 0]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={red} emissive={red} emissiveIntensity={2} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, -0.16, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.06, 0.18, 0.26, 16]} />
            <meshStandardMaterial color={red} emissive={red} emissiveIntensity={2} transparent opacity={0.9} />
          </mesh>
        </group>

        {dataNodes.map((n, i) => <DataNode key={i} position={n.pos} color={n.color} />)}
      </group>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={baseParticlePositions.length / 3}
            array={baseParticlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={purple} size={0.032} sizeAttenuation transparent opacity={0.4} />
      </points>

      {/* Grid */}
      <gridHelper args={[30, 35, gold, gold]} position={[0, -4.2, 0]}>
        <lineBasicMaterial transparent opacity={0.04} />
      </gridHelper>
    </>
  );
}

export default function HumanBodyBG() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0.8, 8.5], fov: 42 }}>
        <color attach="background" args={["#08080c"]} />
        <fog attach="fog" args={["#08080c", 8, 26]} />
        <HumanBodyScene />
      </Canvas>
      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#08080c_78%)] opacity-90" />
      {/* Gold tint */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(245,158,11,0.02)" }} />
    </div>
  );
}
