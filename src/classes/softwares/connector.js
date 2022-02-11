import Software from '@/classes/items/software'

export default class Connector extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Connector',
      ...data,
    })
  }

  get isConnector() { return true }
}
