import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Roll extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Roll',
      icon: 'roll',
      description: 'Gives you an extra roll during combat',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.rolls += 1
    store.game.playSound('sparkle')
  }
}

registerClass(Roll)
