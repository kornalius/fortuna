import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Handsaw extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Handsaw',
      icon: 'handsaw',
      ...(data || {})
    })
  }
}

registerClass(Handsaw)
