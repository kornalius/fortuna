import Software from '@/classes/items/software'

export default class Ftp extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'FTP',
      equipType: 'ftp',
      usable: false,
      ...data,
    })
  }

  get isFTP() { return true }
}
