import { mixin, registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { IPickable, IPickableData, Pickable } from '@/mixins/pickable'
import { IDropable, Dropable, IDropableData } from '@/mixins/dropable'
import { SetupData } from '@/entity'

export interface IPillsBottleData extends
  IContainerData,
  IPickableData,
  IDropableData
{}

export interface PillsBottle extends
  IPickable,
  IDropable
{}

export class PillsBottle extends Container {
  constructor(data?: IPillsBottleData) {
    super(data)
  }

  setupInstance(data?: IPillsBottleData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills bottle',
      icon: 'pillsBottle',
      ...(data || {})
    })
  }

  async onOpen(): Promise<void> {
    window.store.game.playSound('open-pills-bottle')
    await super.onOpen()
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
