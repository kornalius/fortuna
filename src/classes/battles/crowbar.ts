import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Crowbar extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Crowbar',
      icon: 'crowbar',
      description: 'Deals 4 damages during combat',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 4
      window.store.game.playSound('knife')
    }
  }
}

registerClass(Crowbar)
