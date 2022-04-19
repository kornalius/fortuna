import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class ExtraPunch extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'ExtraPunch',
      icon: 'extrapunch',
      description: 'Give it some extra punch. 4 sword symbols = 10 dmg',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.addBonusCombo({
      faces: { 'A': 4 },
      valueLabel: () => '10 dmg',
      expr: async () => {
        store.player.addBuff('dmg', 10, 0, 1)
        store.game.playSound('punch')
      }
    }, 1)
  }
}

registerClass(ExtraPunch)
