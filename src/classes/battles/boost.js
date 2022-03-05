import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Boost extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Boost',
      icon: 'healthicons:syringe',
      description: 'Combo! 3 swords = 5 extra damage',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 3 },
      expr: async () => {
        store.player.combat.npc.hp -= 5
      }
    }, 1)
  }
}

registerClass(Boost)
