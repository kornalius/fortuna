import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export interface ITransportData extends IItemData {}

export class Transport extends Item {
  setupInstance(data?: ITransportData): SetupData | undefined {
    return super.setupInstance({
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Transport)
