import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class PowerBoost extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'PowerBoost',
      icon: 'boost',
      description: 'Receive a surge of power from your inner self, each sword symbol is worth x2',
      ...data,
    })
  }

  async onUse() {
    store.combat.multipliers['A'] = 2
    store.game.playSound('swoop-up')
  }
}

registerClass(PowerBoost)
