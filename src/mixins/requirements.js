import { store } from '@/store'
import { log } from '@/utils'

export default {
  state: {
    // [{ name: actionName, attrName: value... }]
    requirements: [],
  },

  get requirements() { return this.state.requirements },
  set requirements(value) { this.state.requirements = value },

  checkRequirementsFor(actionName, showMessage) {
    const requirements = this.requirements.filter(r => r.name === actionName)
    for (let requirement of requirements) {
      for (let attr in requirement) {
        if (attr !== 'name') {
          const v = requirement[attr]
          if (store.player[attr] < v) {
            if (showMessage) {
              log(`Requirement not met for ${attr}, must be greater or equal to ${v}`)
            }
            return false
          }
        }
      }
    }
    return true
  },

  requirementsLabelFor(actionName) {
    const labels = []
    const requirements = this.requirements.filter(r => r.name === actionName)
    for (let requirement of requirements) {
      for (let attr in requirement) {
        if (attr !== 'name') {
          const v = requirement[attr]
          if (store.player[attr] < v) {
            labels.push(`${attr} ${v}`)
          }
        }
      }
    }
    return labels.length ? `(${labels.join(', ')})` : ''
  },
}
