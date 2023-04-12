import { registerClass } from '@/utils'
import { BattleItem, IBattleItemSetupData } from './battle-item'
import { SetupData } from '@/entity'

export class ShieldBuster extends BattleItem {
  setupInstance(data?: IBattleItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'ShieldBuster',
      icon: 'bust',
      description: 'Remove 1 shield from opponent.',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    // remove a shield dice from npc
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.shieldDice.pop()
      window.store.game.playSound('break')
    }
  }
}

registerClass(ShieldBuster)
