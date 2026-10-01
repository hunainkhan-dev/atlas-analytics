import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLS = 16;
const ROWS = 8;
const COUNT = COLS * ROWS;

// A living 3D revenue landscape — a grid of bars whose heights ripple.
function Bars() {
  const ref = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const cLow = useMemo(() => new THREE.Color('#1e3a8a'), []);
  const cHigh = useMemo(() => new THREE.Color('#60a5fa'), []);

  const cells = useMemo(() => {
    const arr = [];
    for (let x = 0; x < COLS; x++) for (let z = 0; z < ROWS; z++) arr.push([x, z]);
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    cells.forEach(([x, z], i) => {
      const wave = Math.sin(x * 0.5 + t) * Math.cos(z * 0.6 + t * 0.7);
      const h = 0.3 + (wave * 0.5 + 0.5) * 2.6;
      dummy.position.set((x - COLS / 2) * 0.42, h / 2 - 0.6, (z - ROWS / 2) * 0.42);
      dummy.scale.set(0.26, h, 0.26);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
      color.copy(cLow).lerp(cHigh, Math.min(1, h / 3));
      ref.current.setColorAt(i, color);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
    ref.current.parent.rotation.y = 0.6 + Math.sin(t * 0.12) * 0.25;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.35} metalness={0.35} />
    </instancedMesh>
  );
}

export default function DataViz() {
  return (
    <Canvas
      camera={{ position: [0, 4.2, 7], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />
      <pointLight position={[-5, 3, -4]} intensity={0.9} color="#3b82f6" />
      <group rotation={[0.15, 0.6, 0]}>
        <Suspense fallback={null}>
          <Bars />
        </Suspense>
      </group>
    </Canvas>
  );
}
