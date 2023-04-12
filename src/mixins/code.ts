/**
 * Add a unique code
 */

import { State } from '@/entity'

export interface ICodeSetupData {
  // code
  code?: string | null
}

export interface ICode {
  state: State
  get code(): string | null
  set code(value)
}

export const Code: ICode = {
  state: {
    code: null,
  } as ICodeSetupData,

  get code(): string | null { return this.state.code },
  set code(value) { this.state.code = value },
}
