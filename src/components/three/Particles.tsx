import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'motion/react'

type ParticlesProps = { count?: number }

export function Particles({ count = 1600 }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport, pointer } = useThree()
  const reduced = useReducedMotion()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * viewport.width * 2
      arr[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count, viewport.width, viewport.height])

  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts) return

    if (reduced) return

    pts.rotation.y += delta * 0.02
    pts.position.x = THREE.MathUtils.lerp(pts.position.x, pointer.x * 0.5, 0.04)
    pts.position.y = THREE.MathUtils.lerp(pts.position.y, pointer.y * 0.5, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#0B1F3A"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}