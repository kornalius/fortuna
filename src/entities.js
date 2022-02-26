import { reactive } from 'vue'

export default class Entities {
  storeName = 'entities'

  state = reactive({})

  get list() { return Object.keys(this.state).map(k => this.state[k]) }

  get(id) { return this.state[id] }

  findByName(name) { return this.list.find(e => e.name === name) }

  async reset() {
    Object.keys(this.state).forEach(k => {
      delete this.state[k]
    })
  }

  update(item) {
    if (Array.isArray(item)) {
      return item.map(d => this.update(d))
    } else {
      item.state.store = this.storeName
      this.state[item.id] = item
      item.mounted()
      return item
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
