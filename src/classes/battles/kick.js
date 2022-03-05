import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Kick extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Kick',
      icon: 'mdi:karate',
      description: 'A good kick to face never hurts, or does it? Kick your opponent for 1 immediate damage',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 1
    store.game.playSound('kick')
  }
}

registerClass(Kick)
