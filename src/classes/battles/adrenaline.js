import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Adrenaline extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Adrenaline',
      icon: 'fluent:pill-20-filled',
      description: 'Inject yourself with a nice dose of adrenaline for 4 hp',
      ...data,
    })
  }

  async onUse() {
    store.player.hp += 4
    store.game.playSound('tape')
  }
}

registerClass(Adrenaline)
