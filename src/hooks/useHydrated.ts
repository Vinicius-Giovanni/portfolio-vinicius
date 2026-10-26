import { useEffect, useState } from 'react'

/**
 * Retorna false durante SSR e primeira renderização do cliente.
 * Vira true após o useEffect rodar (hidratação completa).
 * Use para renderizar componentes que não devem existir no SSR.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}