import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Hope extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hope',
      icon: 'hope',
      description: 'Giving you hope, you will defeat this opponent. 2 heart symbols = + 4 hp',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    if (window.store.player.combat) {
      window.store.player.combat.addBonusCombo({
        faces: { 'H': 2 },
        valueLabel: () => '+4 hp',
        expr: async () => {
          window.store.player.hp += 4
          window.store.game.playSound('choir')
        }
      }, 1)
    }
  }
}

registerClass(Hope)
