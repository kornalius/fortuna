import { Logs } from './logs'
import { Config } from './config'
import { Player } from './player'
import { Items } from './items'
import { Doors } from './doors'
import { Cities } from './cities'
import { Buildings } from './buildings'
import { Rooms } from './rooms'
import { Npcs } from './npcs'
import { Dialogs } from './dialogs'
import { Combats } from './combats'
import { Game } from './game'
import cities, { loadCities } from '@/data/cities'
import { AnyData } from '@/utils'

export interface IStores {
  config: Config
  player: Player
  items: Items
  doors: Doors
  cities: Cities
  buildings: Buildings
  rooms: Rooms
  npcs: Npcs
  dialogs: Dialogs
  combats: Combats
  logs: Logs
  game: Game
}

const store: AnyData = {
}

declare global {
  interface Window {
    store: IStores
  }
}

window.store = store as IStores

store.config = new Config()
store.player = new Player()
store.items = new Items()
store.doors = new Doors()
store.cities = new Cities()
store.buildings = new Buildings()
store.rooms = new Rooms()
store.npcs = new Npcs()
store.dialogs = new Dialogs()
store.combats = new Combats()
store.logs = new Logs()
store.game = new Game()

export const reset = async () => {
  await Promise.all(Object.keys(store).map(k => (store as any)[k].reset()))
  loadCities(await cities)
}

setTimeout(async () => {
  loadCities(await cities)
}, 100)
