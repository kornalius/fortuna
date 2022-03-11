import Container from '@/classes/containers/container'
import { mixin, registerClass } from '@/utils'
import Pickable from '@/mixins/pickable'
import Dropable from '@/mixins/dropable'
import { store } from '@/store';

export default class PillsBottle extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pills bottle',
      icon: 'pills-bottle',
      ...data,
    })
  }

  async onOpen() {
    store.game.playSound('open-pills-bottle')
  }

  async onSearch() {
    store.game.playSound('search-pills-bottle')
  }
}

mixin(PillsBottle, [
  Pickable,
  Dropable,
])

registerClass(PillsBottle)
