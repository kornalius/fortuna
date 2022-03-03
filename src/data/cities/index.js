import { store } from '@/store'
import City from '@/classes/city'

const modules = import.meta.glob('./**/city-*.js')

export const loadCities = cities => {
  cities.forEach(city => {
    store.cities.update(new City(city))
  })
}

export default Promise.all(
  Object.keys(modules)
    .map(async path => (
      (await modules[path]()).default
    ))
)
