import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemData } from '@/classes/items/item'

export class CeilingLight extends Light {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Ceiling light',
      icon: 'ceiling-light',
      ...(data || {})
    })
  }
}

registerClass(CeilingLight)
