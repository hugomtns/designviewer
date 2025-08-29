import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Canvas3D = () => {
  return (
    <Canvas
      camera={{ 
        position: [10, 10, 10], 
        fov: 60 
      }}
      style={{ background: '#87CEEB' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        castShadow
      />

      {/* Controls for panning, zooming, rotating */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2} // Prevent going below ground
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