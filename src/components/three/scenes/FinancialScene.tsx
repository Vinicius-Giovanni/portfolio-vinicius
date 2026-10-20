import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Lightformer,
  Sparkles,
  Text3D,
  Center,
} from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'

const SAFE_SIZE = 2.05
const SAFE_DEPTH = 1.25
const DOOR_THICKNESS = 0.16
const DIAL_RADIUS = 0.32
const FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json'

const NAVY_METAL = '#0B1F3A'
const NAVY_METAL_LIGHT = '#1a2f4f'
const NAVY_DARK = '#050d1a'
const GOLD_BASE = '#C9A227'
const GOLD_HIGHLIGHT = '#F4E4BC'
const STEEL_LIGHT = '#3a4a60'

const BAR_W = 0.32
const BAR_H = 0.09
const BAR_D = 0.15
const SPACING_X = 0.36
const SPACING_Z = 0.2
const SPACING_Y = 0.095
const FLOOR_Y = -SAFE_SIZE / 2 + 0.15
const BASE_Y = FLOOR_Y + 0.03 + BAR_H / 2

function GoldMaterial() {
  return (
    <meshPhysicalMaterial
      color={GOLD_BASE}
      metalness={1}
      roughness={0.18}
      clearcoat={1}
      clearcoatRoughness={0.08}
      envMapIntensity={2}
      emissive={GOLD_BASE}
      emissiveIntensity={0.1}
    />
  )
}

function SteelMaterial() {
  return (
    <meshPhysicalMaterial
      color={STEEL_LIGHT}
      metalness={0.95}
      roughness={0.28}
      clearcoat={0.4}
      clearcoatRoughness={0.2}
      envMapIntensity={1.2}
    />
  )
}

function SafeBodyMaterial() {
  return (
    <meshPhysicalMaterial
      color={NAVY_METAL_LIGHT}
      metalness={0.88}
      roughness={0.32}
      clearcoat={0.55}
      clearcoatRoughness={0.18}
      envMapIntensity={1.4}
    />
  )
}

function SafeDoorMaterial() {
  return (
    <meshPhysicalMaterial
      color={NAVY_METAL}
      metalness={0.92}
      roughness={0.22}
      clearcoat={0.7}
      clearcoatRoughness={0.12}
      envMapIntensity={1.6}
    />
  )
}

function GoldBar({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[BAR_W, BAR_H, BAR_D]} />
      <GoldMaterial />
    </mesh>
  )
}

function GoldStack() {
  const bars = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 4; j++)
        arr.push([(i - 2) * SPACING_X, BASE_Y, (j - 1.5) * SPACING_Z])
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        arr.push([(i - 1.5) * SPACING_X, BASE_Y + SPACING_Y, (j - 1.5) * SPACING_Z])
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        arr.push([(i - 1) * SPACING_X, BASE_Y + SPACING_Y * 2, (j - 1) * SPACING_Z])
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++)
        arr.push([(i - 0.5) * SPACING_X, BASE_Y + SPACING_Y * 3, (j - 0.5) * SPACING_Z])
    arr.push([-SPACING_X / 2, BASE_Y + SPACING_Y * 4, 0])
    arr.push([SPACING_X / 2, BASE_Y + SPACING_Y * 4, 0])
    arr.push([0, BASE_Y + SPACING_Y * 5, 0])
    return arr
  }, [])

  return (
    <group>
      {bars.map((pos, i) => (
        <GoldBar key={i} position={pos} />
      ))}
    </group>
  )
}

function Dial({ dialRef }: { dialRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={dialRef}>
      <mesh>
        <torusGeometry args={[DIAL_RADIUS, 0.04, 16, 48]} />
        <meshPhysicalMaterial
          color={GOLD_HIGHLIGHT}
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          envMapIntensity={2.5}
        />
      </mesh>
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * DIAL_RADIUS * 0.5, Math.sin(angle) * DIAL_RADIUS * 0.5, 0]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[DIAL_RADIUS * 0.95, 0.04, 0.04]} />
          <meshPhysicalMaterial
            color={GOLD_HIGHLIGHT}
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            envMapIntensity={2.5}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
        <meshPhysicalMaterial
          color={GOLD_HIGHLIGHT}
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          envMapIntensity={2.5}
        />
      </mesh>
    </group>
  )
}

function Rivet({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 12, 12]} />
      <SteelMaterial />
    </mesh>
  )
}

type SceneProps = {
  isActive?: boolean
  isVisible?: boolean
  isMobile?: boolean
}

export function FinancialScene({
  isActive = true,
  isVisible = true,
  isMobile = false,
}: SceneProps) {
  const reduced = useReducedMotion()
  const doorRef = useRef<THREE.Group>(null)
  const dialRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const animStartRef = useRef<number | null>(null)

  // Posições — desktop: canto direito | mobile: centro-atrás, menor, menos dominante
  const safePosition: [number, number, number] = isMobile ? [0.15, -0.15, -1.6] : [2.5, -0.15, 0]
  const safeRotation: [number, number, number] = isMobile ? [0, 0, 0] : [0, -0.75, 0]
  const safeScale = isMobile ? 0.82 : 1
  const doorSwing = isMobile ? 1.05 : 1.4

  const lightPosition: [number, number, number] = isMobile ? [0.15, 0.3, 0.6] : [2.5, 0.3, 0.6]
  const shadowPosition: [number, number, number] = isMobile ? [0.15, -1.2, -1.6] : [2.5, -1.2, 0]
  const shadowOpacity = isMobile ? 0.4 : 0.75

  useEffect(() => {
    animStartRef.current = null
    if (doorRef.current) doorRef.current.rotation.y = 0
    if (dialRef.current) dialRef.current.rotation.z = 0
    if (glowRef.current) glowRef.current.intensity = 0
  }, [isActive, isVisible])

  useFrame((state) => {
    if (!isActive || !isVisible) return

    if (reduced) {
      if (doorRef.current) doorRef.current.rotation.y = -doorSwing
      if (glowRef.current) glowRef.current.intensity = 2
      return
    }

    if (animStartRef.current === null) animStartRef.current = state.clock.elapsedTime
    const elapsed = state.clock.elapsedTime - animStartRef.current

    if (dialRef.current) {
      const p = Math.min(1, elapsed / 3)
      const eased = 1 - Math.pow(1 - p, 4)
      dialRef.current.rotation.z = eased * Math.PI * 2 * 4
    }

    if (doorRef.current) {
      const p = Math.max(0, Math.min(1, (elapsed - 3) / 2))
      const eased = 1 - Math.pow(1 - p, 3)
      doorRef.current.rotation.y = -eased * doorSwing
    }

    if (glowRef.current) {
      const p = Math.max(0, Math.min(1, (elapsed - 3.5) / 1.5))
      glowRef.current.intensity = p * 2.5
    }
  })

  return (
    <group>
      <Environment resolution={256} frames={Infinity}>
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[5, 3, 4]}
          scale={[8, 8, 1]}
          color="#FFF0C8"
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[-2, 1, -6]}
          scale={[10, 6, 1]}
          color="#A8C0FF"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[0, 6, 0]}
          scale={[8, 8, 1]}
          color="#FFFFFF"
        />
      </Environment>

      <ContactShadows
        position={shadowPosition}
        opacity={shadowOpacity}
        scale={7}
        blur={2.8}
        far={3.5}
        color="#000000"
        resolution={512}
      />

      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#FFF0C8" />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#A8C0FF" />
      <directionalLight position={[3, 1, 4]} intensity={0.7} color="#FFE4A0" />

      <pointLight
        ref={glowRef}
        position={lightPosition}
        intensity={0}
        color="#FFE4A0"
        distance={5}
        decay={1.5}
      />

      <group position={safePosition} rotation={safeRotation} scale={safeScale}>
        {[
          [-SAFE_SIZE / 2 + 0.22, -SAFE_SIZE / 2 - 0.05, -SAFE_DEPTH / 2 + 0.22],
          [SAFE_SIZE / 2 - 0.22, -SAFE_SIZE / 2 - 0.05, -SAFE_DEPTH / 2 + 0.22],
          [-SAFE_SIZE / 2 + 0.22, -SAFE_SIZE / 2 - 0.05, SAFE_DEPTH / 2 - 0.22],
          [SAFE_SIZE / 2 - 0.22, -SAFE_SIZE / 2 - 0.05, SAFE_DEPTH / 2 - 0.22],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.07, 0.09, 0.11, 16]} />
            <SteelMaterial />
          </mesh>
        ))}

        <mesh position={[0, 0, -SAFE_DEPTH / 2 + 0.05]}>
          <boxGeometry args={[SAFE_SIZE, SAFE_SIZE, 0.1]} />
          <SafeBodyMaterial />
        </mesh>
        <mesh position={[-SAFE_SIZE / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.1, SAFE_SIZE, SAFE_DEPTH]} />
          <SafeBodyMaterial />
        </mesh>
        <mesh position={[SAFE_SIZE / 2 - 0.05, 0, 0]}>
          <boxGeometry args={[0.1, SAFE_SIZE, SAFE_DEPTH]} />
          <SafeBodyMaterial />
        </mesh>
        <mesh position={[0, SAFE_SIZE / 2 - 0.05, 0]}>
          <boxGeometry args={[SAFE_SIZE, 0.1, SAFE_DEPTH]} />
          <SafeBodyMaterial />
        </mesh>
        <mesh position={[0, -SAFE_SIZE / 2 + 0.05, 0]}>
          <boxGeometry args={[SAFE_SIZE, 0.1, SAFE_DEPTH]} />
          <SafeBodyMaterial />
        </mesh>

        <mesh position={[0, SAFE_SIZE / 2 - 0.03, SAFE_DEPTH / 2 - 0.03]}>
          <boxGeometry args={[SAFE_SIZE + 0.02, 0.06, 0.04]} />
          <SteelMaterial />
        </mesh>
        <mesh position={[0, -SAFE_SIZE / 2 + 0.03, SAFE_DEPTH / 2 - 0.03]}>
          <boxGeometry args={[SAFE_SIZE + 0.02, 0.06, 0.04]} />
          <SteelMaterial />
        </mesh>
        <mesh position={[-SAFE_SIZE / 2 + 0.03, 0, SAFE_DEPTH / 2 - 0.03]}>
          <boxGeometry args={[0.06, SAFE_SIZE + 0.02, 0.04]} />
          <SteelMaterial />
        </mesh>
        <mesh position={[SAFE_SIZE / 2 - 0.03, 0, SAFE_DEPTH / 2 - 0.03]}>
          <boxGeometry args={[0.06, SAFE_SIZE + 0.02, 0.04]} />
          <SteelMaterial />
        </mesh>

        <mesh position={[0, FLOOR_Y, 0]}>
          <boxGeometry args={[SAFE_SIZE - 0.3, 0.05, SAFE_DEPTH - 0.3]} />
          <meshPhysicalMaterial color={NAVY_DARK} metalness={0.4} roughness={0.75} />
        </mesh>

        <GoldStack />

        {!reduced && (
          <Sparkles
            count={12}
            scale={1.3}
            size={1}
            speed={0.3}
            color="#FFE4A0"
            opacity={0.4}
            position={[0, -0.5, 0]}
          />
        )}

        <group ref={doorRef} position={[-SAFE_SIZE / 2, 0, SAFE_DEPTH / 2 - 0.05]}>
          <mesh position={[SAFE_SIZE / 2, 0, 0]}>
            <boxGeometry args={[SAFE_SIZE, SAFE_SIZE, DOOR_THICKNESS]} />
            <SafeDoorMaterial />
          </mesh>

          <mesh position={[SAFE_SIZE / 2, 0, DOOR_THICKNESS / 2 + 0.012]}>
            <boxGeometry args={[SAFE_SIZE * 0.84, SAFE_SIZE * 0.84, 0.02]} />
            <meshPhysicalMaterial color={NAVY_DARK} metalness={0.95} roughness={0.4} />
          </mesh>

          <Rivet position={[SAFE_SIZE / 2 - 0.16, SAFE_SIZE / 2 - 0.16, DOOR_THICKNESS / 2 + 0.01]} />
          <Rivet position={[SAFE_SIZE / 2 + 0.16, SAFE_SIZE / 2 - 0.16, DOOR_THICKNESS / 2 + 0.01]} />
          <Rivet position={[SAFE_SIZE / 2 - 0.16, -SAFE_SIZE / 2 + 0.16, DOOR_THICKNESS / 2 + 0.01]} />
          <Rivet position={[SAFE_SIZE / 2 + 0.16, -SAFE_SIZE / 2 + 0.16, DOOR_THICKNESS / 2 + 0.01]} />

          <Center position={[SAFE_SIZE / 2, SAFE_SIZE / 2 - 0.36, DOOR_THICKNESS / 2 + 0.015]}>
            <Text3D
              font={FONT_URL}
              size={0.055}
              height={0.012}
              curveSegments={4}
              bevelEnabled
              bevelThickness={0.002}
              bevelSize={0.002}
            >
              Nº 004
              <meshPhysicalMaterial color={STEEL_LIGHT} metalness={1} roughness={0.3} />
            </Text3D>
          </Center>

          <group position={[SAFE_SIZE / 2, 0.05, DOOR_THICKNESS / 2 + 0.06]}>
            <Dial dialRef={dialRef} />
          </group>

          <mesh position={[SAFE_SIZE / 2 + 0.5, 0, DOOR_THICKNESS / 2 + 0.06]}>
            <cylinderGeometry args={[0.04, 0.04, 0.45, 16]} />
            <GoldMaterial />
          </mesh>
          <mesh position={[SAFE_SIZE / 2 + 0.44, 0.18, DOOR_THICKNESS / 2 + 0.06]}>
            <boxGeometry args={[0.13, 0.05, 0.05]} />
            <SteelMaterial />
          </mesh>
          <mesh position={[SAFE_SIZE / 2 + 0.44, -0.18, DOOR_THICKNESS / 2 + 0.06]}>
            <boxGeometry args={[0.13, 0.05, 0.05]} />
            <SteelMaterial />
          </mesh>

          <mesh position={[SAFE_SIZE / 2 - 0.45, -SAFE_SIZE / 2 + 0.36, DOOR_THICKNESS / 2 + 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>

          <Center position={[SAFE_SIZE / 2, -SAFE_SIZE / 2 + 0.36, DOOR_THICKNESS / 2 + 0.015]}>
            <Text3D
              font={FONT_URL}
              size={0.042}
              height={0.01}
              curveSegments={4}
              bevelEnabled
              bevelThickness={0.002}
              bevelSize={0.002}
            >
              ECONOMIA
              <meshPhysicalMaterial color={GOLD_BASE} metalness={1} roughness={0.25} />
            </Text3D>
          </Center>

          {[-SAFE_SIZE / 3, 0, SAFE_SIZE / 3].map((y, i) => (
            <mesh key={i} position={[0.06, y, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.2, 16]} />
              <GoldMaterial />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}