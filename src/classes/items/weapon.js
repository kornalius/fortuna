import Item from './item'

export default class Weapon extends Item {
  setupInstance(data) {
    return {
      name: 'Weapon',
      ...data,
    }
  }

  get isWeapon() { return true }
}
