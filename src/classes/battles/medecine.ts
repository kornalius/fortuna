import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Medecine extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Medecine',
      icon: 'medecine',
      description: 'Improve your doctor\'s skills, each heart symbol is worth x2',
      ...(data || {})
    })
  }

  async onUse() {
    if (window.store.player.combat) {
      window.store.player.combat.multipliers['D'] = 2
      window.store.game.playSound('buff-2')
    }
  }
}

registerClass(Medecine)
