import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Bandage extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bandage',
      icon: 'bandage',
      description: 'Patch you up with some bandages for 2 hp',
      uses: 5,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.hp += 2
    window.store.game.playSound('tape')
  }
}

registerClass(Bandage)
