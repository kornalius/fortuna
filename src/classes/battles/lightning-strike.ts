import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class LightningStrike extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Lightning strike',
      icon: 'lightning',
      description: `Accumulate energy from ambient air, compress it and turn it into a devastating lighting bolt. 
        4 sword symbols = 10 extra damage`,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'A': 4 },
        valueLabel: () => '10 dmg',
        expr: async () => {
          if (window.store.player.combat?.npc) {
            window.store.player.combat.npc.hp -= 10
          }
        }
      }, 1)
    }
  }
}

registerClass(LightningStrike)
