import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class Defibrilator extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Defibrilator',
      icon: 'defibrilator',
      description: 'Your heart beats are stabilized. 4 heart symbols = full hp',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'H': 4 },
        valueLabel: () => 'full hp',
        expr: async () => {
          window.store.player.hp = window.store.player.maxHp
          window.store.game.playSound('defibrilator')
        }
      }, 1)
    }
  }
}

registerClass(Defibrilator)
