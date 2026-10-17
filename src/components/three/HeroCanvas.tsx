import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Particles } from './Particles'

export function HeroCanvas() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return null

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Particles />
    </Canvas>
  )
}