import { can, emit, log } from '@/utils'

/**
 * Make the object examinable
 */

export default {
  state: {
    // is the object examinable or not
    examinable: true,
    // how many times the object has been examined
    examined: 0,
    actions: [
      item => (
        item.isExaminable
          ? {
            label: item.examineLabel,
            key: 'examine',
            icon: 'examine',
            disabled: !item.canExamine(),
            click: async () => item.examine(),
          }
          : undefined
      ),
    ],
    actionsOrder: [
      'examine',
    ],
  },

  get isExaminable() { return this.state.examinable },
  set examinable(value) { this.state.examinable = value },

  get examined() { return this.state.examined },
  set examined(value) { this.state.examined = value },

  get examineLabel() {
    return `Examine ${this.requirementsLabelFor('examine')}`
  },

  canExamine(showMessage) {
    return can(this, [
      {
        expr: () => !this.isExaminable,
        log: `${this.name} cannot be examined`
      },
    ], showMessage, 'examine')
  },

  async examine() {
    if (!this.canExamine(true)) {
      return false
    }
    this.examined += 1
    log(`You examine the ${this.name.toLowerCase()} but find nothing particular about it.`)
    await emit.call(this, 'onExamine')
    return true
  },

  async onExamine() {},
}
