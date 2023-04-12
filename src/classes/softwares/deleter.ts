import { registerClass } from '@/utils'
import { ISoftwareSetupData, Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export class Deleter extends Software {
  setupInstance(data?: ISoftwareSetupData): SetupData | undefined {
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
