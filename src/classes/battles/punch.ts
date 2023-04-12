import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Punch extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Punch',
      icon: 'fist',
      description: 'A good kick to face never hurts, or does it? Punch your opponent for 1 immediate damage',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 1
      window.store.game.playSound('kick')
    }
  }
}

registerClass(Punch)
