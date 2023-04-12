import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class Vaccine extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Vaccine',
      icon: 'syringe',
      description: 'Inject yourself with a nice dose of vaccine, each heart symbol is worth x2',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'H': 3 },
        valueLabel: () => 'x2',
        expr: async () => {
          if (window.store.player.combat) {
            window.store.player.combat.multipliers['D'] = 2
          }
        }
      }, 1)
      window.store.game.playSound('water-swirl')
    }
  }
}

registerClass(Vaccine)
