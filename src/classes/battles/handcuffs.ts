import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Handcuffs extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Handcuffs',
      icon: 'handcuffs',
      description: 'Restrict your opponent from attack power. Remove 1 sword from opponent.',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    // remove a sword dice from npc
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.swordDice.pop()
      window.store.game.playSound('handcuffs')
    }
  }
}

registerClass(Handcuffs)
