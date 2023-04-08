import { mixin, registerClass } from '@/utils'
import { Container } from './container'
import { IPickable } from '@/mixins/pickable'
import { Dropable } from '@/mixins/dropable'
import { SetupData } from '@/entity'

export interface PillsBottle extends IPickable, Dropable {}

export class PillsBottle extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills bottle',
      icon: 'pillsBottle',
      ...(data || {})
    })
  }

  async onOpen() {
    window.store.game.playSound('open-pills-bottle')
  }

  async onSearch() {
    window.store.game.playSound('search-pills-bottle')
  }
}

mixin(PillsBottle, [
  Pickable,
  Dropable,
])

registerClass(PillsBottle)
