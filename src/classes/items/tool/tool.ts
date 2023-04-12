import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export interface IToolSetupData extends IItemSetupData {}

export class Tool extends Item {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tool',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Tool)
