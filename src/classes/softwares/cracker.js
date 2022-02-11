import Software from '@/classes/items/software'

export default class Cracker extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cracker',
      ...data,
    })
  }

  get isCracker() { return true }
}
