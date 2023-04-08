import { State } from '@/entity'

/**
 * Add a unique code
 */

export interface ITooltip {
  state: State
  tooltip(): string | undefined
}

export const Tooltip: ITooltip = {
  state: {},

  tooltip(): string | undefined { return undefined },
}
