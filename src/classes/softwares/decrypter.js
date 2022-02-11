import Software from '@/classes/items/software'

export default class Decrypter extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Decrypter',
      ...data,
    })
  }

  get isDecrypter() { return true }
}
