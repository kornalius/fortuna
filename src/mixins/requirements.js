import { store } from '@/store'
import { log } from '@/utils'

/**
 * Adds actions requirements to an object. Before executing an action, it will check its requirements
 */

const attrIcons = {
  lvl: '🌟',
  str: '💪',
  dex: '🏃',
  int: '🧠',
  credits: '💳',
}

export default {
  state: {
    // requirements for an action [{ name: actionName, attrName: value... }]
    requirements: [],
  },

  get requirements() { return this.state.requirements },
  set requirements(value) { this.state.requirements = value },

  /**
   * Checks if all requirements are met
   *
   * @param actionName {string}
   * @param showMessage {boolean}
   * @returns {boolean}
   */
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

  /**
   * Build a requirements string for display purposes
   *
   * @param actionName {string}
   * @returns {string}
   */
  requirementsLabelFor(actionName) {
    const labels = []
    const requirements = this.requirements.filter(r => r.name === actionName)
    for (let requirement of requirements) {
      for (let attr in requirement) {
        if (attr !== 'name') {
          const v = requirement[attr]
          if (store.player[attr] < v) {
            labels.push(`${attrIcons[attr]} ${v}`)
          }
        }
      }
    }
    return labels.length ? `(${labels.join(', ')})` : ''
  },
}
