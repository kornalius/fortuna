import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Boost extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Boost',
      icon: 'pills',
      description: 'Confidence booster. 3 sword symbols = 5 extra damage',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 3 },
      valueLabel: () => '5 dmg',
      expr: async () => {
        store.player.combat.npc.hp -= 5
      }
    }, 1)
  }
}

registerClass(Boost)
