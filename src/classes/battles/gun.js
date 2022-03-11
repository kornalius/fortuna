import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Gun extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Gun',
      icon: 'gun',
      description: 'Shoot your opponent for 3 immediate damages',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 3
    store.game.playSound('gun')
  }
}

registerClass(Gun)
