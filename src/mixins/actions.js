import compact from 'lodash/compact'

export default {
  state: {
    actions: [],
    actionsOrder: [],
    omitActions: [],
  },

  get actions() { return this.state.actions },

  get dropdownOptions() {
    const options = compact(this.actions.map(a => this.actionToObject(a)))
      .filter(a => !this.state.omitActions.includes(a.key))
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

  async exec(key, options = {}) {
    const action = this.actionToObject(this.actions.find(a => this.actionToObject(a)?.key === key))
    if (action && action.click) {
      return store.game.exec({
        key,
        target: this,
        location: this.location,
        ...options,
        fn: async () => action.click(this)
      })
    }
  },
}
