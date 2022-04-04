import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Axe extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Axe',
      icon: 'axe',
      ...data,
    })
  }
}

registerClass(Axe)
