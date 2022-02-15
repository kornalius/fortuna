import Item from './item'

export default class Armor extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Armor',
      def: 0,
      ...data,
    })
  }

  get isArmor() { return true }

  get def() { return this.state.def }
  set def(value) { this.state.def = value }

}
