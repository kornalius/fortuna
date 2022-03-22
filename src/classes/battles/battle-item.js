import Item from '../items/item'
import { log, LOG_WARN, registerClass } from '@/utils'

export default class BattleItem extends Item {
  setupInstance(data) {
    return super.setupInstance({
      usable: true,
      ...data,
    })
  }

  get isBattle() { return true }

  canUse(showMessage) {
    if (!store.player.isInCombat) {
      if (showMessage) {
        log(`You must be in combat to use ${this.name}.toLowerCase()`, LOG_WARN, this.icon)
      }
      return false
    }
    if (store.player.combat.processing) {
      if (showMessage) {
        log(`You must wait for your turn to use ${this.name}.toLowerCase()`, LOG_WARN, this.icon)
      }
      return false
    }
    return super.canUse(showMessage)
  }
}

registerClass(BattleItem)
