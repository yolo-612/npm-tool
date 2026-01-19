import { inject, ComponentInternalInstance } from 'vue'
import { saspTableInjectKey } from '../types'

export function useCurrentTable() {
  const table = inject<ComponentInternalInstance>(saspTableInjectKey)
  return { table }
}
