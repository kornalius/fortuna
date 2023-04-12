import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Luck extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Luck',
      icon: 'luck',
      description: 'Blesses you with 3 extra rolls during battle',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.rolls += 3
    window.store.game.playSound('sparkle')
  }
}

registerClass(Luck)
