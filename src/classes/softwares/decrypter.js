import Software from '@/classes/items/software'

export default class Decrypter extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Decrypter',
      equipType: 'decrypter',
      usable: false,
      ...data,
    })
  }

  get isDecrypter() { return true }
}
