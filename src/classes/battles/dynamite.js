import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Dynamite extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Dynamite',
      icon: 'dynamite',
      description: 'Deals 5 damages during combat',
      uses: 1,
      ...data,
    })
  }

  async onUse() {
    store.player.combat.npc.hp -= 5
    store.game.playSound('explosion')
  }
}

registerClass(Dynamite)
