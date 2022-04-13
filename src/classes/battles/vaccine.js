import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Vaccine extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Vaccine',
      icon: 'syringe',
      description: 'Inject yourself with a nice dose of vaccine, each heart symbol is worth x2',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'H': 3 },
      valueLabel: () => 'x2',
      expr: async () => {
        store.combat.multipliers['D'] = 2
      }
    }, 1)
    store.game.playSound('water-swirl')
  }
}

registerClass(Vaccine)
