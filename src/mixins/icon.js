/**
 * Add an icon state to object
 */

export default {
  state: {
    icon: null,
    iconSuffix: null,
    female: false,
  },

  get icon() {
    if (this.iconSuffix) {
      return `${this.state.icon}-${this.iconSuffix}`
    }
    if (this.female) {
      return `${this.state.icon}-female`
    }
    return this.state.icon
  },
  set icon(value) { this.state.icon = value },

  get female() { return this.state.female },
  set female(value) { this.state.female = value },

  get iconSuffix() { return this.state.iconSuffix },
  set iconSuffix(value) { this.state.iconSuffix = value },
}
