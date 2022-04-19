import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Bullseye extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bullseye',
      icon: 'bullseye',
      description: 'Hit it right in that sweet spot. 3 sword symbols = 6 dmg',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 3 },
      valueLabel: () => '6 dmg',
      expr: async () => {
        store.player.addBuff('dmg', 6, 0, 1)
        store.game.playSound('arrow')
      }
    }, 1)
  }
}

registerClass(Bullseye)
