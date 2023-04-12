import random from 'lodash/random'
import { pickRandom, registerClass } from '@/utils'
import capitalize from 'lodash/capitalize'
import { City, ICityData } from '@/classes/city'
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
import { SetupData } from '@/entity'

export interface IRandomCitySetypData extends ICityData {
  name?: string | null
  population?: string | null
  adj1?: string | null
  adj2?: string | null
  adj3?: string | null
  skylineAdj?: string | null
  buildingAdj?: string | null
  building?: string | null
  culture?: string | null
  recognition?: string | null
  place?: string | null
  quality?: string | null
}

export class RandomCity extends City {
  constructor(data?: IRandomCitySetypData) {
    super(data)
  }

  setupInstance(data?: IRandomCitySetypData): SetupData | undefined {
    return {
      name: pickRandom(cityNames),
      population: random(300000, 4500000),
      adj1: pickRandom(cityAdjectives1),
      adj2: pickRandom(cityAdjectives2),
      adj3: pickRandom(cityAdjectives3),
      skylineAdj: pickRandom(citySkylineAdjectives),
      buildingAdj: pickRandom(cityBuildingAdjectives),
      building: pickRandom(cityBuildings),
      culture: pickRandom(cityCultures),
      recognition: pickRandom(cityRecognitions),
      place: pickRandom(cityPlaces),
      quality: pickRandom(cityQualities),
    }
  }

  get population(): number { return this.state.population }
  set population(value) { this.state.population = value }

  get adj1(): string { return this.state.adj1 }
  set adj1(value) { this.state.adj1 = value }

  get adj2(): string { return this.state.adj2 }
  set adj2(value) { this.state.adj2 = value }

  get adj3(): string { return this.state.adj3 }
  set adj3(value) { this.state.adj3 = value }

  get skylineAdj(): string { return this.state.skylineAdj }
  set skylineAdj(value) { this.state.skylineAdj = value }

  get buildingAdj(): string { return this.state.buildingAdj }
  set buildingAdj(value) { this.state.buildingAdj = value }

  get building(): string { return this.state.building }
  set building(value) { this.state.building = value }

  get culture(): string { return this.state.culture }
  set culture(value) { this.state.culture = value }

  get recognition(): string { return this.state.recognition }
  set recognition(value) { this.state.recognition = value }

  get place(): string { return this.state.place }
  set place(value) { this.state.place = value }

  get quality(): string { return this.state.quality }
  set quality(value) { this.state.quality = value }

  get description(): string {
    return `${this.nameProper} is a ${this.adj1} ${this.adj2} ${this.adj3}. 
      The skyline is ${this.skylineAdj} with ${this.buildingAdj} skyscrapers 
      and ${this.building}. ${capitalize(this.culture)} from all over the world come to it 
      for its ${this.recognition} and its numerous ${this.place}. It is known for its 
      ${this.quality} and the city has grown through the years to unite more than ${this.population} 
      people to this day.
    `
  }
}

registerClass(RandomCity)
