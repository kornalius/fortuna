import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Shield extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Shield',
      icon: 'shield',
      description: 'Adds 1 extra shield of protection for 1 turn',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('shield', 1, 0, 1)
    store.game.playSound('sword-hit')
  }
}

registerClass(Shield)
