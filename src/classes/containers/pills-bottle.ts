import { mixin, registerClass } from '@/utils'
import { Container } from './container'
import { IPickable, Pickable } from '@/mixins/pickable'
import { IDropable, Dropable } from '@/mixins/dropable'
import { SetupData } from '@/entity'

export interface PillsBottle extends IPickable, IDropable {}

export class PillsBottle extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills bottle',
      icon: 'pillsBottle',
      ...(data || {})
    })
  }

  async onOpen(): Promise<void> {
    window.store.game.playSound('open-pills-bottle')
  }

  async onSearch(): Promise<void> {
    window.store.game.playSound('search-pills-bottle')
  }
}

mixin(PillsBottle, [
  Pickable,
  Dropable,
])

registerClass(PillsBottle)
