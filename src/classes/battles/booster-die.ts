import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class BoosterDie extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'BoosterDie',
      icon: 'boosterDie',
      description: 'Adds 3 extra die for 1 turn',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.addBuff('dice', 3, 0, 1)
  }
}

registerClass(BoosterDie)
