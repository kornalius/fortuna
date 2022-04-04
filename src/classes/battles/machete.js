import BattleItem from './battle-item'
import { registerClass } from '@/utils'

export default class Machete extends BattleItem {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Machete',
      icon: 'machete',
      ...data,
    })
  }
}

registerClass(Machete)
