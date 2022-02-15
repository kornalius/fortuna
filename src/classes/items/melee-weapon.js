import Weapon from './weapon'

export default class MeleeWeapon extends Weapon {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Melee weapon',
      ...data,
    })
  }

  get isMelee() { return true }
}
