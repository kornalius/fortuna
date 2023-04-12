import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Bless extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bless',
      icon: 'bless',
      description: 'Blesses you with 2 extra rolls during battle',
      uses: 2,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.rolls += 2
    window.store.game.playSound('sparkle')
  }
}

registerClass(Bless)
