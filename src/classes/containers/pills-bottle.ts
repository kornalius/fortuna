import { mixin, registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { IPickable, IPickableSetupData, Pickable } from '@/mixins/pickable'
import { IDropable, Dropable, IDropableSetupData } from '@/mixins/dropable'
import { SetupData } from '@/entity'

export interface IPillsBottleSetupData extends
  IContainerSetupData,
  IPickableSetupData,
  IDropableSetupData
{}

export interface PillsBottle extends
  IPickable,
  IDropable
{}

export class PillsBottle extends Container {
  constructor(data?: IPillsBottleSetupData) {
    super(data)
  }

  setupInstance(data?: IPillsBottleSetupData): SetupData | undefined {
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
