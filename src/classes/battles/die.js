import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Die extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Die',
      icon: 'dice',
      description: 'Adds 1 extra die for 1 turn',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('dice', 1, 0, 1)
  }
}

registerClass(Die)
