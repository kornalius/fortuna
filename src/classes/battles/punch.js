import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Punch extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Punch',
      icon: 'fist',
      description: 'A good kick to face never hurts, or does it? Punch your opponent for 1 immediate damage',
      uses: 5,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 1
    store.game.playSound('kick')
  }
}

registerClass(Punch)
