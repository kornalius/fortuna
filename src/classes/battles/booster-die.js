import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class BoosterDie extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'BoosterDie',
      icon: 'boosterDie',
      description: 'Adds 3 extra die for 1 turn',
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('dice', 3, 0, 1)
  }
}

registerClass(BoosterDie)
