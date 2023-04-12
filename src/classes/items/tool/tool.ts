import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export interface IToolData extends IItemData {}

export class Tool extends Item {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tool',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Tool)
