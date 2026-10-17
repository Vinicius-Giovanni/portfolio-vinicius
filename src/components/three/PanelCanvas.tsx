import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import type { ReactNode } from 'react'

type PanelCanvasProps = {
  children: ReactNode
  isActive: boolean
  cameraPosition?: [number, number, number]
  envPreset?: 'studio' | 'city' | 'sunset' | 'dawn' | 'apartment'
}

export function PanelCanvas({
  children,
  isActive,
  cameraPosition = [0, 0, 6],
  envPreset = 'studio',
}: PanelCanvasProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: cameraPosition, fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={isActive ? 'always' : 'demand'}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#EDE6D8" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#8BA4C9" />
      <pointLight position={[0, 0, 4]} intensity={0.5} />

      <Environment preset={envPreset} />

      {children}

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </Canvas>
  )
}