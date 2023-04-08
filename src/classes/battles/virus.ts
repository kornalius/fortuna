import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Virus extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Virus',
      icon: 'virus',
      description: 'Infects your opponent with a nasty virus which paralyzes him/her for 2 turns',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.skipTurns += 2
      window.store.game.playSound('slurp')
    }
  }
}

registerClass(Virus)
