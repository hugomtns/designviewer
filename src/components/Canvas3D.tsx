import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface Canvas3DProps {
  is2DMode: boolean
}

const Canvas3D = ({ is2DMode }: Canvas3DProps) => {
  const controlsRef = useRef<any>(null)

  return (
    <Canvas
      camera={is2DMode ? {
        position: [0, 50, 0],
        up: [0, 0, -1],
        fov: 60
      } : { 
        position: [10, 10, 10], 
        fov: 60 
      }}
      orthographic={is2DMode}
      style={{ background: '#87CEEB' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        castShadow
      />

      {/* Controls with different settings for 2D vs 3D */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={is2DMode ? false : true}
        maxPolarAngle={is2DMode ? 0 : Math.PI / 2} // No rotation below ground in 3D, no vertical rotation in 2D
        minPolarAngle={is2DMode ? 0 : 0}
        target={[0, 0, 0]}
      />

      {/* Test cube to verify 3D is working */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Ground plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>
    </Canvas>
  )
}

export default Canvas3D