import { reactive } from 'vue'
import { registeredClasses, serializeObject } from '@/utils'

export default class Entities {
  storeName = 'entities'
  model = null

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

  deserialize() {
    return this.list.map(i => {
      const Klass = registeredClasses[i.constructor.name]
      if (!Klass) {
        console.error(`Class ${i.constructor.name} has not been registered`)
      }
      return {
        klass: i.constructor.name,
        value: i.deserialize(),
      }
    })
  }

  serialize(data) {
    return data.forEach(d => {
      const Klass = registeredClasses[d.klass]
      if (!Klass) {
        console.error(`Class ${d.klass} has not been registered`)
      } else {
        const m = new Klass()
        serializeObject(d.value, m.state)
        this.update(m)
      }
    })
  }
}
