/**
 * Make the object examinable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'

export interface IExaminable extends IName, IIcon, IRequirements {
  state: State
  get isExaminable(): boolean
  set examinable(value: boolean)
  get examined(): number
  set examined(value)
  get examineLabel(): string
  canExamine(showMessage?: boolean): boolean
  examine(): Promise<boolean>
  onExamine(): Promise<void>
}

// @ts-ignore
export const Examinable: IExaminable = {
  state: {
    // is the object examinable or not
    examinable: true,
    // how many times the object has been examined
    examined: 0,
    actions: [
      (item: IExaminable) => (
        item.isExaminable
          ? {
            label: item.examineLabel,
            key: 'examine',
            icon: 'examine',
            disabled: !item.canExamine(),
            scale: 2,
            click: async () => item.examine(),
          }
          : undefined
      ),
    ],
    actionsOrder: [
      'examine',
    ],
  },

  get isExaminable(): boolean { return this.state.examinable },
  set examinable(value: boolean) { this.state.examinable = value },

  get examined(): number { return this.state.examined },
  set examined(value) { this.state.examined = value },

  get examineLabel(): string { return `Examine ${this.requirementsLabelFor('examine')}` },

  canExamine(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isExaminable,
        log: () => `${this.nameProper} cannot be examined`
      },
    ], showMessage, 'examine')
  },

  async examine(): Promise<boolean> {
    if (!this.canExamine(true)) {
      return false
    }
    this.examined += 1
    log(`You examine the ${this.nameDisplay} but find nothing particular about it.`, LOG_WARN, this.icon)
    await emit(this, 'onExamine')
    return true
  },

  async onExamine(): Promise<void> {},
}
