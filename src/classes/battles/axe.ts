import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Axe extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Axe',
      icon: 'axe',
      description: 'Deals 3 damages during combat',
      uses: 2,
      ...(data || {})
    })
  }

  async onUse() {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 3
      window.store.game.playSound('knife')
    }
  }
}

registerClass(Axe)
