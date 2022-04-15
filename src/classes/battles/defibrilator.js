import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Defibrilator extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Defibrilator',
      icon: 'defibrilator',
      description: 'Your heart beats are stabilized. 4 heart symbols = full hp',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'H': 4 },
      valueLabel: () => 'full hp',
      expr: async () => {
        store.player.hp = store.player.maxHp
        store.game.playSound('defibrilator')
      }
    }, 1)
  }
}

registerClass(Defibrilator)
