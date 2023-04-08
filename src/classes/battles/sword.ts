import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Sword extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sword',
      icon: 'sword',
      description: 'Adds 1 extra sword for 1 turn',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.addBuff('sword', 1, 0, 1)
  }
}

registerClass(Sword)
