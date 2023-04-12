import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemData } from '@/classes/items/item'

export class DeskLamp extends Light {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Desk lamp',
      icon: 'desk-lamp',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(DeskLamp)
