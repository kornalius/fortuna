import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Bandage extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bandage',
      icon: 'bandage',
      description: 'Patch you up with some bandages for 2 hp',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.hp += 2
    store.game.playSound('tape')
  }
}

registerClass(Bandage)
