import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Axe extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Axe',
      icon: 'axe',
      description: 'Deals 3 damages during combat',
      uses: 2,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 3
    store.game.playSound('knife')
  }
}

registerClass(Axe)
