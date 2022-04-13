import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Mutation extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Mutation',
      icon: 'vialGreen',
      description: 'Mutate into an horrible thing. 3 sword symbols = 7 extra damage',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 3 },
      valueLabel: () => '7 dmg',
      expr: async () => {
        store.player.combat.npc.hp -= 7
      }
    }, 1)
  }
}

registerClass(Mutation)
