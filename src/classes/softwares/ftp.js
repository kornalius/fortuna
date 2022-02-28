import Software from '@/classes/softwares/software'
import { registerClass } from '@/utils'

export default class Ftp extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'FTP',
      installType: 'ftp',
      usable: false,
      ...data,
    })
  }

  get isFTP() { return true }
}

registerClass(Ftp)
