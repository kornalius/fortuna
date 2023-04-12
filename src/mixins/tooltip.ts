import { State } from '@/entity'

/**
 * Add a unique code
 */

export interface ITooltipSetupData {
  tooltip?: () => string | undefined
}

export interface ITooltip {
  state: State
  tooltip(): string | undefined
}

export const Tooltip: ITooltip = {
  state: {} as ITooltipSetupData,

  tooltip(): string | undefined { return undefined },
}
