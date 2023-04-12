import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class Shield extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shield',
      icon: 'shield',
      description: 'Adds 1 extra shield of protection for 1 turn',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.addBuff('shield', 1, 0, 1)
    window.store.game.playSound('sword-hit')
  }
}

registerClass(Shield)
