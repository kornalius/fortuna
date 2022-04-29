import random from 'lodash/random'
import capitalize from 'lodash/capitalize'
import City from '@/classes/city'
import { pickRandom, registerClass } from '@/utils'
import {
  cityAdjectives1,
  cityAdjectives2,
  cityAdjectives3,
  cityBuildingAdjectives,
  cityBuildings,
  cityCultures,
  cityNames,
  cityPlaces,
  cityQualities,
  cityRecognitions,
  citySkylineAdjectives
} from '@/words'

export default class RandomCity extends City {
  setupInstance(data) {
    const name = pickRandom(cityNames)
    const population = random(300000, 4500000)

    return {
      name,
      population,
      adj1: random(cityAdjectives1),
      adj2: random(cityAdjectives2),
      adj3: random(cityAdjectives3),
      skylineAdj: random(citySkylineAdjectives),
      buildingAdj: random(cityBuildingAdjectives),
      building: random(cityBuildings),
      culture: random(cityCultures),
      recognition: random(cityRecognitions),
      place: random(cityPlaces),
      quality: random(cityQualities),
    }
  }

  get population() { return this.state.population }
  set population(value) { this.state.population = value }

  get adj1() { return this.state.adj1 }
  set adj1(value) { this.state.adj1 = value }

  get adj2() { return this.state.adj2 }
  set adj2(value) { this.state.adj2 = value }

  get adj3() { return this.state.adj3 }
  set adj3(value) { this.state.adj3 = value }

  get skylineAdj() { return this.state.skylineAdj }
  set skylineAdj(value) { this.state.skylineAdj = value }

  get buildingAdj() { return this.state.buildingAdj }
  set buildingAdj(value) { this.state.buildingAdj = value }

  get building() { return this.state.building }
  set building(value) { this.state.building = value }

  get culture() { return this.state.culture }
  set culture(value) { this.state.culture = value }

  get recognition() { return this.state.recognition }
  set recognition(value) { this.state.recognition = value }

  get place() { return this.state.place }
  set place(value) { this.state.place = value }

  get quality() { return this.state.quality }
  set quality(value) { this.state.quality = value }

  get description() {
    return `${this.name} is a ${this.adj1} ${this.adj2} ${this.adj3}. 
      The skyline is ${this.skylineAdj} with ${this.buildingAdj} skyscrapers 
      and ${this.building}. ${capitalize(this.culture)} from all over the world come to it 
      for its ${this.recognition} and its numerous ${this.place}. It is known for its 
      ${this.quality} and the city has grown through the years to unite more than ${this.population} 
      people to this day.
    `
  }
}

registerClass(RandomCity)
