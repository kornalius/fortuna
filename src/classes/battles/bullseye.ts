import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class Bullseye extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bullseye',
      icon: 'bullseye',
      description: 'Hit it right in that sweet spot. 3 sword symbols = 6 dmg',
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
          window.store.game.playSound('arrow')
        }
      }, 1)
    }
  }
}

registerClass(Bullseye)
