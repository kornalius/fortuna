import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class Dynamite extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Dynamite',
      icon: 'dynamite',
      description: 'Deals 5 damages during combat',
      uses: 1,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 5
      window.store.game.playSound('explosion')
    }
  }
}

registerClass(Dynamite)
