import Item from './item'

export default class BattleItem extends Item {
  setupInstance(data) {
    return super.setupInstance({
      ...data,
    })
  }

  get isBattle() { return true }
}
