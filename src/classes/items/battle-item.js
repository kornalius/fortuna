import Item from './item'
import { registerClass } from '@/utils'

export default class BattleItem extends Item {
  setupInstance(data) {
    return super.setupInstance({
      ...data,
    })
  }

  get isBattle() { return true }
}

registerClass(BattleItem)
