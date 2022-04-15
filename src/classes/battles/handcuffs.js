import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Handcuffs extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Handcuffs',
      icon: 'handcuffs',
      description: 'Restrict your opponent from attack power. Remove 1 sword from opponent.',
      ...data,
    })
  }

  async onUse() {
    // remove a sword dice from npc
    store.player.combat.npc.swordDice.pop()
    store.game.playSound('handcuffs')
  }
}

registerClass(Handcuffs)
