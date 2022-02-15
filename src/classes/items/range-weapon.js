import Weapon from './weapon'

export default class RangeWeapon extends Weapon {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Range weapon',
      ...data,
    })
  }

  get isRanged() { return true }
}
