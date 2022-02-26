import Config from './config'
import Player from './player'
import Items from './items'
import Doors from './doors'
import Cities from '@/store/cities'
import Buildings from '@/store/buildings'
import Rooms from './rooms'
import Npcs from './npcs'
import Dialogs from './dialogs'
import Combats from './combats'
import Logs from './logs'
import Game from './game'
import cities, { loadCities } from '@/data/cities'

export const models = {
  config: Config,
  player: Player,
  items: Items,
  doors: Doors,
  cities: Cities,
  buildings: Buildings,
  rooms: Rooms,
  npcs: Npcs,
  dialogs: Dialogs,
  combats: Combats,
  logs: Logs,
  game: Game,
}

export const store = {}
window.store = store

export const reset = async () => {
  await Promise.all(Object.keys(models).map(k => store[k].reset()))
  loadCities(await cities)
}

(async () => {
  Object.keys(models).forEach(k => {
    store[k] = new models[k]()
  })
loadCities(await cities)
})()
