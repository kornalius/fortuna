import { emit, log } from '@/utils'

export default {
  state: {
    examinable: true,
    examined: 0,
    actions: [
      item => (
        item.isExaminable
          ? {
            label: item.examineLabel,
            key: 'examine',
            icon: 'emojione:eye',
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
    if (!this.isExaminable) {
      if (showMessage) {
        log(`${this.name} cannot be examined`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('examine', showMessage));
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
