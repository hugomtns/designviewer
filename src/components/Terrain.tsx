import { useMemo } from 'react'
import * as THREE from 'three'

interface TerrainProps {
  designData: any
}

const Terrain = ({ designData }: TerrainProps) => {
  const terrainGeometry = useMemo(() => {
    if (!designData?.Layout?.Terrain?.Triangles) {
      console.log('No terrain triangles found')
      return null
    }

    const triangles = designData.Layout.Terrain.Triangles
    console.log('Processing', triangles.length, 'triangles')
    
    const geometry = new THREE.BufferGeometry()
    
    // Flatten all triangle vertices into a single array
    const vertices = []
    for (const triangle of triangles) {
      for (const vertex of triangle) {
        // Swap Y and Z coordinates: JSON uses Y-up, Three.js uses Z-up
        vertices.push(vertex[0], vertex[2], vertex[1]) // x, z, y
      }
    }
    
    console.log('Total vertices:', vertices.length / 3)
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
    
    // No need for indices since we already have the vertices in triangle order
    geometry.computeVertexNormals()
    
    return geometry
  }, [designData])

  // Always show fallback plane if no valid terrain geometry
  if (!terrainGeometry) {
    return (
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          color="#228B22" 
          roughness={0.8}
          side={THREE.DoubleSide} 
        />
      </mesh>
    )
  }

  return (
    <mesh geometry={terrainGeometry} receiveShadow>
      <meshStandardMaterial 
        color="#228B22" 
        roughness={0.8}
        side={THREE.DoubleSide} 
      />
    </mesh>
  )
}

export default Terrain