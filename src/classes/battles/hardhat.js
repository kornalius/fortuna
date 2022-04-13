import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Hardhat extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hardhat',
      icon: 'hardhat',
      description: 'Give yourself 2 extra shields for 2 turns against ennemy\'s attack',
      ...data,
    })
  }

  async onUse() {
    store.player.addBuff('shield', 2, 0, 2)
    store.game.playSound('sword-hit')
  }
}

registerClass(Hardhat)
