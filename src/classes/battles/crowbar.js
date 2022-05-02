import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Crowbar extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Crowbar',
      icon: 'crowbar',
      description: 'Deals 4 damages during combat',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 4
    store.game.playSound('knife')
  }
}

registerClass(Crowbar)
