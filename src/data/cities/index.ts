import { City } from '@/classes/city'

const modules = import.meta.glob('./**/city-*.ts')

export const loadCities = (cities: City[]): void => {
  cities.forEach(city => {
    window.store.cities.update(new City(city))
  })
}

export default Promise.all(
  Object.keys(modules)
    .map(async path => (
      (await modules[path]()).default
    ))
)
