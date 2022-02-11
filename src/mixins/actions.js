import compact from 'lodash/compact'
import uniqBy from 'lodash/uniqBy'
import reverse from 'lodash/reverse'

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
    // take the latest key added
    const uniques = uniqBy(reverse(orderedOptions), 'key')
    // reverse it back to original order
    return reverse(uniques)
  },

  actionToObject(a) {
    return typeof a === 'function' ? a(this) : a
  },

  findAction(key) {
    return this.actionToObject(this.actions.find(a => this.actionToObject(a)?.key === key))
  },
}
