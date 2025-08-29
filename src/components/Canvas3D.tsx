import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import './Canvas3D.css'

interface Canvas3DProps {
  is2DMode: boolean
}

const Canvas3D = ({ is2DMode }: Canvas3DProps) => {
  const controlsRef = useRef<any>(null)

  return (
    <Canvas
      camera={{ 
        position: [10, 10, 10], 
        fov: 60 
      }}
      className="canvas-3d"
    >
      {/* Camera setup - only add orthographic camera in 2D mode */}
      {is2DMode && (
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={50}
          bottom={-50}
          left={50}
          right={-50}
          near={1}
          far={200}
          position={[0, 100, 0]}
        />
      )}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        castShadow
      />

      {/* Controls - same settings for both modes */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={!is2DMode}
        maxPolarAngle={Math.PI / 2}
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
        <meshStandardMaterial color="#2ecc71" side={THREE.DoubleSide} />
      </mesh>
    </Canvas>
  )
}

export default Canvas3D