import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Die extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Die',
      icon: 'dice',
      description: 'Adds 1 extra die for 1 turn',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse() {
    window.store.player.addBuff('dice', 1, 0, 1)
  }
}

registerClass(Die)
