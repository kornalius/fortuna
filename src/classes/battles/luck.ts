import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Luck extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Luck',
      icon: 'luck',
      description: 'Blesses you with 3 extra rolls during battle',
      ...(data || {})
    })
  }

  async onUse() {
    window.store.player.rolls += 3
    window.store.game.playSound('sparkle')
  }
}

registerClass(Luck)
