import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Sword extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sword',
      icon: 'sword',
      description: 'Adds 1 extra sword for 1 turn',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('sword', 1, 0, 1)
  }
}

registerClass(Sword)
