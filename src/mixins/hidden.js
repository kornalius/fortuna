import { emit } from '@/utils'

/**
 * Make the object hidden
 */

export default {
  state: {
    // is the object hidden or not
    hidden: true,
  },

  get isVisible() { return !this.isHidden },
  get isHidden() { return this.state.hidden },
  set hidden(value) { this.state.hidden = value },

  async show() {
    this.hidden = false
    await emit.call(this, 'onShow')
    return true
  },

  async hide() {
    this.hidden = true
    await emit.call(this, 'onHide')
    return true
  },

  async toggleVisibility() {
    if (this.isVisible) {
      return this.hide()
    }
    return this.show()
  },
}
