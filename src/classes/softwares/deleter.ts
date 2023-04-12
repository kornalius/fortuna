import { registerClass } from '@/utils'
import { ISoftwareData, Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export class Deleter extends Software {
  setupInstance(data?: ISoftwareData): SetupData | undefined {
    return super.setupInstance({
      name: 'Deleter',
      installType: 'deleter',
      usable: false,
      ...(data || {})
    })
  }

  get isDeleter(): boolean { return true }
}

registerClass(Deleter)
