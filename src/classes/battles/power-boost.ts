import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class PowerBoost extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'PowerBoost',
      icon: 'boost',
      description: 'Receive a surge of power from your inner self, each sword symbol is worth x2',
      ...(data || {})
    })
  }

  async onUse() {
    if (window.store.player.combat) {
      window.store.player.combat.multipliers['A'] = 2
      window.store.game.playSound('swoop-up')
    }
  }
}

registerClass(PowerBoost)
