import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class LightningStrike extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Lightning strike',
      icon: 'lightning',
      description: 'Accumulate energy from ambient air, compress it and turn it into a devastating lighting bolt. 4 sword symbols = 10 extra damage',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 4 },
      valueLabel: () => '10 dmg',
      expr: async () => {
        store.player.combat.npc.hp -= 10
      }
    }, 1)
  }
}

registerClass(LightningStrike)
