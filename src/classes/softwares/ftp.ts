import { registerClass } from '@/utils'
import { ISoftwareSetupData, Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export class Ftp extends Software {
  setupInstance(data?: ISoftwareSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'FTP',
      installType: 'ftp',
      usable: false,
      ...(data || {})
    })
  }

  get isFTP(): boolean { return true }
}

registerClass(Ftp)
