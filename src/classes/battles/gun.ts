import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'


export class Gun extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Gun',
      icon: 'gun',
      description: 'Shoot your opponent for 3 immediate damages',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 3
      window.store.game.playSound('gun')
    }
  }
}

registerClass(Gun)
