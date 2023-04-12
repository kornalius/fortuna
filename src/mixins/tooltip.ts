import { State } from '@/entity'

/**
 * Add a unique code
 */

export interface ITooltipData {
  tooltip?: () => string | undefined
}

export interface ITooltip {
  state: State
  tooltip(): string | undefined
}

export const Tooltip: ITooltip = {
  state: {} as ITooltipData,

  tooltip(): string | undefined { return undefined },
}
