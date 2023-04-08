import { reactive } from 'vue'
import { registeredClasses, serializeObject } from '@/utils'
import { Entity } from '@/entity'
import { UnwrapNestedRefs } from '@vue/reactivity'

export interface SerializedData {
  klass?: string;
  value: any;
}

export class Entities {
  storeName = 'entities'

  state: UnwrapNestedRefs<any> = reactive({})

  get list(): Entity[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Entity | undefined { return id ? this.state[id] : undefined }

  findByCode(code?: string | null): Entity | undefined { return this.list.find(e => (e as any).code === code) }

  findByName(name?: string | null): Entity | undefined { return this.list.find(e => (e as any).name === name) }

  async reset() {
    Object.keys(this.state).forEach(k => {
      delete this.state[k]
    })
  }

  update(e: Entity[] | Entity): Entity[] | Entity {
    if (Array.isArray(e)) {
      return e.map(d => this.update(d)) as Entity[]
    } else {
      e.state.store = this.storeName
      this.state[e.id] = e
      e.mounted()
      return e
    }
  }

  remove(id: string[] | string) {
    if (Array.isArray(id)) {
      id.forEach(i => this.remove(i))
    } else {
      delete this.state[id]
    }
  }

  deserialize(): SerializedData[] {
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

  serialize(data: SerializedData[]) {
    return data.forEach((d: SerializedData) => {
      const Klass = d.klass ? registeredClasses[d.klass] : undefined
      if (!Klass) {
        console.error(`Class ${d.klass} has not been registered`)
      } else {
        const e = new Klass() as Entity
        serializeObject(d.value, e.state)
        this.update(e)
      }
    })
  }
}
