import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import Terrain from './Terrain'
import './Canvas3D.css'

interface Canvas3DProps {
  is2DMode: boolean
  designData: any
}

const Canvas3D = ({ is2DMode, designData }: Canvas3DProps) => {
  const controlsRef = useRef<any>(null)

  return (
    <Canvas
      camera={{ 
        position: [10, 10, 10], 
        fov: 60,
        near: 0.1,
        far: 10000
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
          near={0.1}
          far={10000}
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

      {/* Controls - different settings for 2D vs 3D */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={is2DMode ? 0 : Math.PI / 2}
        minPolarAngle={is2DMode ? 0 : 0}
        target={[0, 0, 0]}
      />

      {/* Terrain */}
      <Terrain designData={designData} />

      {/* Test cube to verify 3D is working */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
    </Canvas>
  )
}

export default Canvas3D