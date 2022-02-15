import Software from '@/classes/softwares/software'

export default class Deleter extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Deleter',
      equipType: 'deleter',
      usable: false,
      ...data,
    })
  }

  get isDeleter() { return true }
}
