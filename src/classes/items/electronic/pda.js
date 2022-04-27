import Electronic from './electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class PDA extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'PDA',
      icon: 'pda',
      ...data,
    })
  }
}

mixin(PDA, [
  Switch,
])

registerClass(PDA)
