import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Medecine extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Medecine',
      icon: 'medecine',
      description: 'Improve your doctor\'s skills, each heart symbol is worth x2',
      ...data,
    })
  }

  async onUse() {
    store.combat.multipliers['D'] = 2
    store.game.playSound('buff-2')
  }
}

registerClass(Medecine)
