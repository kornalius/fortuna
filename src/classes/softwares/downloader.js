import Software from '@/classes/items/software'

export default class Downloader extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Downloader',
      ...data,
    })
  }

  get isDownloader() { return true }
}
