import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Hope extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hope',
      icon: 'hope',
      description: 'Giving you hope, you will defeat this opponent. 2 heart symbols = + 4 hp',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'H': 2 },
      valueLabel: () => '+4 hp',
      expr: async () => {
        store.player.hp += 4
        store.game.playSound('choir')
      }
    }, 1)
  }
}

registerClass(Hope)
