import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Virus extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Virus',
      icon: 'healthicons:virus',
      description: 'Infects your opponent with a nasty virus which paralyzes him/her for 2 turns',
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.skipTurns += 2
    store.game.playSound('slurp')
  }
}

registerClass(Virus)
