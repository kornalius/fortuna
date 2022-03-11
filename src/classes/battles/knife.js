import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Knife extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Knife',
      icon: 'knife',
      description: 'Slashes your opponent with a knife for 2 damages',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 2
    store.game.playSound('knife')
  }
}

registerClass(Knife)
