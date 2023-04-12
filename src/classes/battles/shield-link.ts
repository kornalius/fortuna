import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class ShieldLink extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'ShieldLink',
      icon: 'shieldLink',
      description: 'Link shields together, each shield symbol is worth x2',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.multipliers['D'] = 2
      window.store.game.playSound('swoop-up')
    }
  }
}

registerClass(ShieldLink)
