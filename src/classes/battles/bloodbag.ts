import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Bloodbag extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bloodbag',
      icon: 'bloodbag',
      description: 'Just like a portable dialysis machine. 3 shield symbols = +3 shields',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'D': 3 },
        valueLabel: () => '+3',
        expr: async () => {
          window.store.player.addBuff('shield', 3, 0, 1)
        }
      }, 1)
    }
  }
}

registerClass(Bloodbag)
