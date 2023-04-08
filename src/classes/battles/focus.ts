import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Focus extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Focus',
      icon: 'focus',
      description: 'Focus on the task at hand. 3 sword symbols = 6 dmg',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'A': 3 },
        valueLabel: () => '6 dmg',
        expr: async () => {
          window.store.player.addBuff('dmg', 6, 0, 1)
          window.store.game.playSound('wobble-up')
        }
      }, 1)
    }
  }
}

registerClass(Focus)
