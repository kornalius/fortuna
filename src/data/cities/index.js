import { store } from '@/store'

const modules = import.meta.glob('./**/city-*.js')

export const loadCities = cities => {
  cities.forEach(city => {
    store.cities.update(new city())
  })
}

export default Promise.all(
  Object.keys(modules)
    .map(async path => (
      (await modules[path]()).default
    ))
)
