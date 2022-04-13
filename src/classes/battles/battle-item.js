import Item from '../items/item'
import { can, LOG_WARN, registerClass } from '@/utils'
import { store } from '@/store'

export default class BattleItem extends Item {
  setupInstance(data) {
    return super.setupInstance({
      usable: true,
      ...data,
    })
  }

  get isBattle() { return true }

  canUse(showMessage) {
    if (!can(this, [
      {
        expr: () => !store.player.isInCombat,
        log: () => `You must be in combat to use ${this.name}.toLowerCase()`,
        level: LOG_WARN
      },
      {
        expr: () => store.player.combat.processing,
        log: () => `You must wait for your turn to use ${this.name}.toLowerCase()`,
        level: LOG_WARN
      },
    ], showMessage)) {
      return false
    }
    return super.canUse(showMessage)
  }
}

registerClass(BattleItem)
