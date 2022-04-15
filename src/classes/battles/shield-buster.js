import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class ShieldBuster extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'ShieldBuster',
      icon: 'bust',
      description: 'Remove 1 shield from opponent.',
      ...data,
    })
  }

  async onUse() {
    // remove a shield dice from npc
    store.player.combat.npc.shieldDice.pop()
    store.game.playSound('break')
  }
}

registerClass(ShieldBuster)
