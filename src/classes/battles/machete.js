import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Machete extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Machete',
      icon: 'machete',
      description: 'Deals 4 damages during combat',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 4
    store.game.playSound('knife')
  }
}

registerClass(Machete)
