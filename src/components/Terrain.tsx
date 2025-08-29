import * as THREE from 'three'

interface TerrainProps {
  designData: any
}

const Terrain = ({ designData }: TerrainProps) => {
  if (!designData?.Layout?.Terrain) {
    // Default ground plane if no terrain data
    return (
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2ecc71" side={THREE.DoubleSide} />
      </mesh>
    )
  }

  // TODO: Render actual terrain from JSON data
  // For now, create a textured ground that looks more like grass
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        color="#228B22" 
        roughness={0.8}
        side={THREE.DoubleSide} 
      />
    </mesh>
  )
}

export default Terrain