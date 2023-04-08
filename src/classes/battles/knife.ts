import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Knife extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Knife',
      icon: 'knife',
      description: 'Slashes your opponent with a knife for 2 damages',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse() {
    if (window.store.player.combat?.npc) {
      window.store.player.combat.npc.hp -= 2
      window.store.game.playSound('knife')
    }
  }
}

registerClass(Knife)
