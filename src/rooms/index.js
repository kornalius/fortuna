import { store } from '@/store'

const modules = import.meta.glob('./**.js')

for (const path in modules) {
  modules[path]().then((mod) => {
    store.rooms.update(new mod.default())
  })
}
