import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class PDA extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'PDA',
      icon: 'pda',
      ...data,
    })
  }
}

registerClass(PDA)
