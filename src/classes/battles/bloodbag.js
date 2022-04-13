import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Bloodbag extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bloodbag',
      icon: 'bloodbag',
      description: 'Just like a portable dialysis machine. 3 shield symbols = + 5 shields',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'D': 3 },
      valueLabel: () => '+5',
      expr: async () => {
        store.player.addBuff('shield', 5, 0, 1)
      }
    }, 1)
  }
}

registerClass(Bloodbag)
