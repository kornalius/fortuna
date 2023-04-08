import { registerClass } from '@/utils'
import { BattleItem } from './battle-item'
import { SetupData } from '@/entity'

export class Adrenaline extends BattleItem {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Adrenaline',
      icon: 'pill',
      description: 'Inject yourself with a nice dose of adrenaline for 4 hp',
      ...(data || {})
    })
  }

  async onUse() {
    window.store.player.hp += 4
    window.store.game.playSound('tape')
  }
}

registerClass(Adrenaline)
