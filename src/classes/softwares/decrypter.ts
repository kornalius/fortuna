import { registerClass } from '@/utils'
import { Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export class Decrypter extends Software {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Decrypter',
      installType: 'decrypter',
      usable: false,
      ...(data || {})
    })
  }

  get isDecrypter(): boolean { return true }
}

registerClass(Decrypter)