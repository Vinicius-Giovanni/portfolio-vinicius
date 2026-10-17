import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'

type ScreenProps = {
  position: [number, number, number]
  rotation?: [number, number, number]
  size: [number, number]
  kind: 'bars' | 'donut' | 'line'
  delay?: number
}

function Screen({ position, rotation = [0, 0, 0], size, kind, delay = 0 }: ScreenProps) {
  const [w, h] = size
  const reduced = useReducedMotion()
  const barsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced || !barsRef.current) return
    barsRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const base = i === 2 ? 1.4 : i === 3 ? 1.8 : 0.8 + (i % 3) * 0.3
      const pulse = Math.sin(state.clock.elapsedTime * 1.2 + i * 0.5 + delay) * 0.15
      mesh.scale.y = base + pulse
      mesh.position.y = ((base + pulse) * 0.5) - 0.5
    })
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Moldura da tela */}
      <RoundedBox args={[w, h, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#0B1F3A" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Superfície de vidro */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[w * 0.92, h * 0.88]} />
        <MeshTransmissionMaterial
          samples={3}
          thickness={0.1}
          chromaticAberration={0.2}
          color="#EDE6D8"
          roughness={0.05}
          ior={1.4}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Conteúdo mockado */}
      <group position={[0, 0, 0.06]}>
        {kind === 'bars' && (
          <group ref={barsRef}>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh
                key={i}
                position={[(i - 2) * (w * 0.14), 0, 0]}
                scale={[1, 1, 1]}
              >
                <boxGeometry args={[w * 0.09, h * 0.5, 0.01]} />
                <meshStandardMaterial
                  color="#EDE6D8"
                  emissive="#EDE6D8"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.85}
                />
              </mesh>
            ))}
          </group>
        )}
        {kind === 'donut' && (
          <mesh>
            <torusGeometry args={[h * 0.25, h * 0.06, 16, 48, Math.PI * 1.4]} />
            <meshStandardMaterial
              color="#EDE6D8"
              emissive="#EDE6D8"
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        )}
        {kind === 'line' && (
          <group>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh
                key={i}
                position={[(i - 2) * (w * 0.16), Math.sin(i) * h * 0.15, 0]}
              >
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial
                  color="#EDE6D8"
                  emissive="#EDE6D8"
                  emissiveIntensity={1}
                  toneMapped={false}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </group>
  )
}

export function DeliveriesScene() {
  const groupRef = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()

  useFrame((state) => {
    if (!groupRef.current || reduced) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.25
  })

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
        <Screen
          position={[-1.4, 0.3, 0.6]}
          rotation={[0, 0.35, 0.05]}
          size={[1.8, 1.2]}
          kind="bars"
          delay={0}
        />
      </Float>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
        <Screen
          position={[0.3, 0.4, -0.4]}
          rotation={[0, -0.15, 0]}
          size={[2.0, 1.3]}
          kind="donut"
          delay={0.4}
        />
      </Float>
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
        <Screen
          position={[1.6, 0.0, 0.8]}
          rotation={[0, -0.5, -0.05]}
          size={[1.6, 1.1]}
          kind="line"
          delay={0.8}
        />
      </Float>
    </group>
  )
}