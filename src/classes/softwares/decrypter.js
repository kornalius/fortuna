import Software from '@/classes/softwares/software'

export default class Decrypter extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Decrypter',
      installType: 'decrypter',
      usable: false,
      ...data,
    })
  }

  get isDecrypter() { return true }
}
