import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Tv extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tv',
      icon: 'tv',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Tv)
