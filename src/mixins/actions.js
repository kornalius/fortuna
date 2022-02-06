import compact from 'lodash/compact'

export default {
  state: {
    actions: [],
    actionsOrder: [],
  },

  get actions() { return this.state.actions },

  get dropdownOptions() {
    const options = compact(this.actions.map(a => this.actionToObject(a)))
    const orderedOptions = []
    this.state.actionsOrder.forEach(key => {
      const a = options.find(a => a.key === key)
      if (a) {
        orderedOptions.push(a)
      }
    })
    options.forEach(a => {
      if (!orderedOptions.includes(a)) {
        orderedOptions.push(a)
      }
    })
    return orderedOptions
  },

  actionToObject(a) {
    return typeof a === 'function' ? a(this) : a
  },

  execAction(key) {
    const action = this.actionToObject(this.actions.find(a => this.actionToObject(a)?.key === key))
    if (action && action.click) {
      action.click(this)
    }
  },
}
