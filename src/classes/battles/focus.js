import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Focus extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Focus',
      icon: 'focus',
      description: 'Focus on the task at hand. 3 sword symbols = 6 dmg',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 3 },
      valueLabel: () => '6 dmg',
      expr: async () => {
        store.player.addBuff('dmg', 6, 0, 1)
        store.game.playSound('wobble-up')
      }
    }, 1)
  }
}

registerClass(Focus)
