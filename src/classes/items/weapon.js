import Item from './item'

export default class Weapon extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Weapon',
      atk: 0,
      ...data,
    })
  }

  get isWeapon() { return true }

  get atk() { return this.state.atk }
  set atk(value) { this.state.atk = value }
}
