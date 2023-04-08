import { registerClass } from '@/utils'
import { Container } from './container'
import { SetupData } from '@/entity'

export class CashRegister extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
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
