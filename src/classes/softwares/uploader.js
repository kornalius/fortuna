import Software from '@/classes/items/software'

export default class Uploader extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Uploader',
      ...data,
    })
  }

  get isUploader() { return true }
}
