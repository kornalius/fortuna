import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Kick extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Kick',
      icon: 'kick',
      description: 'A good kick to face never hurts, or does it? Kick your opponent for 2 immediate damage',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 2
      window.store.game.playSound('kick')
    }
  }
}

registerClass(Kick)
