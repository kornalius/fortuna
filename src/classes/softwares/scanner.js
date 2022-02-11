import Software from '@/classes/items/software'

export default class Scanner extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Scanner',
      ...data,
    })
  }

  get isScanner() { return true }
}
