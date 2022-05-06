import Container from './container'
import { registerClass } from '@/utils'

export default class CashRegister extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cash register',
      icon: 'fa-solid:cash-register',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(CashRegister)
