import { reactive } from 'vue'

export default class Entities {
  storeName = 'entity'

  state = reactive({})

  get list() { return Object.keys(this.state).map(k => this.state[k]) }

  get(id) { return this.state[id] }

  update(item) {
    if (Array.isArray(item)) {
      item.forEach(d => this.update(d))
    } else {
      item.state.store = this.storeName
      this.state[item.id] = item
      item.mounted()
    }
  }

  remove(id) {
    if (Array.isArray(id)) {
      id.forEach(i => this.remove(i))
    } else {
      delete this.state[id]
    }
  }
}
