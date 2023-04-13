import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class TissueBox extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'TissueBox',
      icon: 'tissue-box',
      ...(data || {})
    })
  }
}

registerClass(TissueBox)
