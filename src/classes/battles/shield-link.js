import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class ShieldLink extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'ShieldLink',
      icon: 'shieldLink',
      description: 'Link shields together, each shield symbol is worth x2',
      ...data,
    })
  }

  async onUse() {
    store.combat.multipliers['D'] = 2
    store.game.playSound('swoop-up')
  }
}

registerClass(ShieldLink)
