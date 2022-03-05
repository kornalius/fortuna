import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Freeze extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Freeze',
      icon: 'ic:sharp-ac-unit',
      description: 'Freezes your opponent for 1 turn',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.skipTurns += 1
    store.game.playSound('freeze')
  }
}

registerClass(Freeze)
