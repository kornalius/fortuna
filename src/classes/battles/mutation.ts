import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Mutation extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mutation',
      icon: 'vialGreen',
      description: 'Mutate into an horrible thing. 3 sword symbols = 7 extra damage',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'A': 3 },
        valueLabel: () => '7 dmg',
        expr: async () => {
          if (window.store.player.combat?.npc) {
            window.store.player.combat.npc.hp -= 7
          }
        }
      }, 1)
    }
  }
}

registerClass(Mutation)
