import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class GasCan extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'GasCan',
      icon: 'gascan',
      ...(data || {})
    })
  }
}

registerClass(GasCan)
