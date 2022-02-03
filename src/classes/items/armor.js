import Item from './item'

export default class Armor extends Item {
  setupInstance(data) {
    return {
      name: 'Armor',
      ...data,
    }
  }

  get isArmor() { return true }
}
