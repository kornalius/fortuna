import { loadRoom } from '@/utils'

const modules = import.meta.glob('./*.js')

for (const path in modules) {
  modules[path]().then((mod) => {
    loadRoom(mod.default)
  })
}
