import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Luck extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Luck',
      icon: 'fluent:cube-rotate-20-filled',
      description: 'Blesses you with 3 extra rolls during battle',
      ...data,
    })
  }

  async onUse() {
    store.player.rolls += 3
    store.game.playSound('sparkle')
  }
}

registerClass(Luck)
