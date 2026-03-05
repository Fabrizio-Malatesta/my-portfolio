"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import * as THREE from "three";

// ─── DNA geometry constants ───────────────────────────────────────────────────
const SEGMENTS = 120;
const TURNS = 4;
const RADIUS = 1.8;
const HEIGHT = 11;
const RUNG_INTERVAL = 8;

// ─── DNA Helix mesh ───────────────────────────────────────────────────────────
function DnaHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes1Ref = useRef<THREE.InstancedMesh>(null);
  const nodes2Ref = useRef<THREE.InstancedMesh>(null);

  const { s1, s2, rungs, nodes1, nodes2 } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const rungs: [THREE.Vector3, THREE.Vector3][] = [];
    const nodes1: THREE.Vector3[] = [];
    const nodes2: THREE.Vector3[] = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = (i / SEGMENTS) * Math.PI * 2 * TURNS;
      const y = (i / SEGMENTS) * HEIGHT - HEIGHT / 2;

      const p1 = new THREE.Vector3(RADIUS * Math.cos(t), y, RADIUS * Math.sin(t));
      const p2 = new THREE.Vector3(
        RADIUS * Math.cos(t + Math.PI),
        y,
        RADIUS * Math.sin(t + Math.PI)
      );

      s1.push(p1);
      s2.push(p2);

      if (i % RUNG_INTERVAL === 0) {
        rungs.push([p1.clone(), p2.clone()]);
        nodes1.push(p1.clone());
        nodes2.push(p2.clone());
      }
    }

    return { s1, s2, rungs, nodes1, nodes2 };
  }, []);

  // Set instanced mesh matrices once after mount
  useEffect(() => {
    const matrix = new THREE.Matrix4();
    if (nodes1Ref.current) {
      nodes1.forEach((pos, i) => {
        matrix.setPosition(pos);
        nodes1Ref.current!.setMatrixAt(i, matrix);
      });
      nodes1Ref.current.instanceMatrix.needsUpdate = true;
    }
    if (nodes2Ref.current) {
      nodes2.forEach((pos, i) => {
        matrix.setPosition(pos);
        nodes2Ref.current!.setMatrixAt(i, matrix);
      });
      nodes2Ref.current.instanceMatrix.needsUpdate = true;
    }
  }, [nodes1, nodes2]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Continuous auto-spin: 0.18 rad/s Y + gentle X tilt oscillation
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.25;
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 — cyan */}
      <Line points={s1} color="#22d3ee" lineWidth={3} transparent opacity={0.95} />

      {/* Strand 2 — purple */}
      <Line points={s2} color="#a855f7" lineWidth={3} transparent opacity={0.95} />

      {/* Base-pair rungs — teal */}
      {rungs.map((pair, i) => (
        <Line
          key={i}
          points={pair}
          color="#10b981"
          lineWidth={1.5}
          transparent
          opacity={0.55}
        />
      ))}

      {/* Instanced nodes — strand 1 */}
      <instancedMesh
        ref={nodes1Ref}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args={[undefined as any, undefined as any, nodes1.length]}
      >
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.2} />
      </instancedMesh>

      {/* Instanced nodes — strand 2 */}
      <instancedMesh
        ref={nodes2Ref}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args={[undefined as any, undefined as any, nodes2.length]}
      >
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
      </instancedMesh>
    </group>
  );
}

// ─── Floating particle field ──────────────────────────────────────────────────
function ParticleField() {
  const COUNT = 180;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#22d3ee" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 10, 8]} intensity={2} color="#22d3ee" />
      <pointLight position={[-8, -10, -8]} intensity={1} color="#a855f7" />
      <pointLight position={[0, 0, 6]} intensity={0.5} color="#10b981" />
      <Suspense fallback={null}>
        <DnaHelix />
        <ParticleField />
        <Stars radius={60} depth={40} count={400} factor={1.5} fade speed={0.4} />
      </Suspense>
    </>
  );
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────
export default function DnaCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
