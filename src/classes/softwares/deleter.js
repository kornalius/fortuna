import Software from '@/classes/softwares/software'
import { registerClass } from '@/utils'

export default class Deleter extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Deleter',
      installType: 'deleter',
      usable: false,
      ...data,
    })
  }

  get isDeleter() { return true }
}

registerClass(Deleter)
