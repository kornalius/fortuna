import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Boost extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Boost',
      icon: 'pills',
      description: 'Confidence booster. 3 sword symbols = 5 extra damage',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'A': 3 },
        valueLabel: () => '5 dmg',
        expr: async () => {
          if (window.store.player.combat?.npc) {
            window.store.player.combat.npc.hp -= 5
          }
        }
      }, 1)
    }
  }
}

registerClass(Boost)
