import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'


export class Freeze extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Freeze',
      icon: 'freeze',
      description: 'Freezes your opponent for 1 turn',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.skipTurns += 1
      window.store.game.playSound('freeze')
    }
  }
}

registerClass(Freeze)
