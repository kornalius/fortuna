/**
 * Add an icon state to object
 */
import compact from 'lodash/compact'

export default {
  state: {
    icon: null,
    iconSuffix: null,
  },

  get icon() {
    return compact([this.state.icon, this.iconSuffix]).join('-')
  },
  set icon(value) { this.state.icon = value },

  get iconSuffix() { return this.state.iconSuffix },
  set iconSuffix(value) { this.state.iconSuffix = value },
}
