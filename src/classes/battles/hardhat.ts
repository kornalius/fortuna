import { registerClass } from '@/utils'
import { BattleItem, IBattleItemData } from './battle-item'
import { SetupData } from '@/entity'

export class Hardhat extends BattleItem {
  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hardhat',
      icon: 'hardhat',
      description: 'Give yourself 2 extra shields for 2 turns against ennemy\'s attack',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.player.addBuff('shield', 2, 0, 2)
    window.store.game.playSound('sword-hit')
  }
}

registerClass(Hardhat)
