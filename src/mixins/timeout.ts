/**
 * Makes an object timeout until being available again
 */

import dayjs from 'dayjs'
import { State } from '@/entity'

export interface ITimeout {
  state: State
  get timeoutStart(): number
  set timeoutStart(value)
  get timeoutLength(): number
  set timeoutLength(value)
  get isTimedout(): boolean
  get timeoutRemaining(): number
  get timeoutRemainingString(): string
  clearTimeout(): void
  timeoutFor(length: number): void
}

export const Timeout: ITimeout = {
  state: {
    // when the timeout started (timestamp)
    timeoutStart: 0,
    // length of the timeout in ms
    timeoutLength: 0,
  },

  get timeoutStart(): number { return this.state.timeoutStart },
  set timeoutStart(value) { this.state.timeoutStart = value },

  get timeoutLength(): number { return this.state.timeoutLength },
  set timeoutLength(value) { this.state.timeoutLength = value },

  get isTimedout(): boolean { return this.timeoutLength > 0 && this.timeoutStart > 0 },

  get timeoutRemaining(): number { return this.isTimedout ? Date.now() - this.timeoutStart : 0 },

  get timeoutRemainingString(): string { return dayjs(this.timeoutRemaining).format('HH:mm:ss') },

  clearTimeout(): void {
    this.timeoutStart = 0
    this.timeoutLength = 0
  },

  timeoutFor(length: number): void {
    this.timeoutStart = Date.now()
    this.timeoutLength = length
    setTimeout(() => {
      this.clearTimeout()
    }, length)
  },
}