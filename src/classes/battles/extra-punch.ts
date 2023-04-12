import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class ExtraPunch extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'ExtraPunch',
      icon: 'extrapunch',
      description: 'Give it some extra punch. 4 sword symbols = 10 dmg',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'A': 4 },
        valueLabel: () => '10 dmg',
        expr: async () => {
          window.store.player.addBuff('dmg', 10, 0, 1)
          window.store.game.playSound('punch')
        }
      }, 1)
    }
  }
}

registerClass(ExtraPunch)
