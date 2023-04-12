import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Roll extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Roll',
      icon: 'roll',
      description: 'Gives you an extra roll during combat',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.rolls += 1
    window.store.game.playSound('sparkle')
  }
}

registerClass(Roll)
