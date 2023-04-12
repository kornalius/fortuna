import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class CashRegister extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cash register',
      icon: 'fa-solid:cash-register',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(CashRegister)
