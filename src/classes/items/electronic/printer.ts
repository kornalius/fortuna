import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from '@/classes/items/electronic/electronic'
import { SetupData } from '@/entity'

export class Printer extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Printer',
      icon: 'printer',
      usable: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Printer)
