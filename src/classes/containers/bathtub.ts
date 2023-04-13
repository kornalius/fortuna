import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Bathtub extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bathtub',
      icon: 'bathtub',
      ...(data || {})
    })
  }
}

registerClass(Bathtub)
