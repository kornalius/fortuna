import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Bless extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bless',
      icon: 'bless',
      description: 'Blesses you with 2 extra rolls during battle',
      uses: 2,
      ...data,
    })
  }

  async onUse() {
    store.player.rolls += 2
    store.game.playSound('sparkle')
  }
}

registerClass(Bless)
