import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class CeilingLight extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Ceiling light',
      icon: 'ceiling-light',
      ...(data || {})
    })
  }
}

registerClass(CeilingLight)
