import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class CashRegister extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cash register',
      icon: 'fa-solid:cash-register',
      ...data,
    })
  }
}

registerClass(CashRegister)
