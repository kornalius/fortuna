import Software from '@/classes/items/software'

export default class Authenticator extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Authenticator',
      ...data,
    })
  }

  get isAuthenticator() { return true }
}
