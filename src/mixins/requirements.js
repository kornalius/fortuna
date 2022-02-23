import { store } from '@/store'
import { log } from '@/utils'

export default {
  state: {
    // { actionName: { attrName: value or function } }
    requirements: {},
  },

  get requirements() { return this.state.requirements },
  set requirements(value) { this.state.requirements = value },

  checkRequirementsFor(actionName, showMessage) {
    const requirement = this.requirements[actionName]
    if (requirement) {
      Object.keys(requirement).forEach(attr => {
        const v = requirement[attr]
        if (typeof v === 'function') {
          if (!v.call(this)) {
            if (showMessage) {
              log(`Requirement not met for ${attr}`)
            }
            return false
          }
        } else if (store.player[attr] < v) {
          if (showMessage) {
            log(`Requirement not met for ${attr}, must be greater or equal to ${v}`)
          }
          return false
        }
      })
    }
    return true
  },
}
