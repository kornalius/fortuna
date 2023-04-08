import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class StickyDie extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'StickyDie',
      icon: 'stickyDie',
      description: 'Adds 1 extra die for 3 turns',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.addBuff('dice', 1, 0, 3)
  }
}

registerClass(StickyDie)
