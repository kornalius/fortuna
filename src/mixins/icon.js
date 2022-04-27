/**
 * Add an icon state to object
 */

export default {
  state: {
    icon: null,
    iconSuffix: null,
  },

  get icon() {
    if (this.iconSuffix) {
      return `${this.state.icon}-${this.iconSuffix}`
    }
    return this.state.icon
  },
  set icon(value) { this.state.icon = value },

  get iconSuffix() { return this.state.iconSuffix },
  set iconSuffix(value) { this.state.iconSuffix = value },
}
