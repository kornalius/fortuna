import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class StickyDie extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'StickyDie',
      icon: 'stickyDie',
      description: 'Adds 1 extra die for 3 turns',
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('dice', 1, 0, 3)
  }
}

registerClass(StickyDie)
