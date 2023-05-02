import random from 'lodash/random'
import { pickRandom, registerClass } from '@/utils'
import capitalize from 'lodash/capitalize'
import { City, ICityData } from '@/classes/city'
import {
  cityAdjectives1,
  cityAdjectives2,
  cityAdjectives3,
  cityAges,
  cityBuildingAdjectives,
  cityBuildings,
  cityBuiltAround,
  cityCultures,
  cityGovernments,
  cityHistoricalEvents,
  cityLawEnforcements,
  cityNames,
  cityPlaces,
  cityPrefixes,
  cityQualities,
  cityRecognitions,
  citySkylineAdjectives,
  cityStates,
  citySuffixes
} from '@/words'
import { SetupData } from '@/entity'

export interface IRandomCitySetypData extends ICityData {
  name?: string
  population?: string
  adj1?: string
  adj2?: string
  adj3?: string
  skylineAdj?: string
  buildingAdj?: string
  building?: string
  culture?: string
  recognition?: string
  place?: string
  quality?: string
  builtAround?: string
  government?: string
  historicalEvent?: string
  lawEnforcement?: string
  age?: string
  cityState?: string
}

export class RandomCity extends City {
  constructor(data?: IRandomCitySetypData) {
    super(data)
  }

  setupInstance(data?: IRandomCitySetypData): SetupData | undefined {
    const prefix = random(100) > 75 ? `${pickRandom(cityPrefixes)} ` : ''
    const suffix = random(100) > 50 ? ` ${pickRandom(citySuffixes)}` : ''
    return {
      name: `${prefix}${pickRandom(cityNames)}${suffix}`,
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
      builtAround: pickRandom(cityBuiltAround),
      government: pickRandom(cityGovernments),
      historicalEvent: pickRandom(cityHistoricalEvents),
      lawEnforcement: pickRandom(cityLawEnforcements),
      age: pickRandom(cityAges),
      state: pickRandom(cityStates),
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

  get builtAround(): string { return this.state.builtAround }
  set builtAround(value) { this.state.builtAround = value }

  get government(): string { return this.state.government }
  set government(value) { this.state.government = value }

  get historicalEvent(): string { return this.state.historicalEvent }
  set historicalEvent(value) { this.state.historicalEvent = value }

  get lawEnforcement(): string { return this.state.lawEnforcement }
  set lawEnforcement(value) { this.state.lawEnforcement = value }

  get age(): string { return this.state.age }
  set age(value) { this.state.age = value }

  get cityState(): string { return this.state.cityState }
  set cityState(value) { this.state.cityState = value }

  get description(): string {
    return `${this.nameProper} is ${this.adj1} ${this.adj2} ${this.adj3}. 
      The skyline is ${this.skylineAdj} with ${this.buildingAdj} skyscrapers 
      and ${this.building}. The city is ${this.lawEnforcement}. 
      ${capitalize(this.culture)} from all over the world come to it for its ${this.recognition} and its 
      numerous ${this.place}. It is known for its ${this.quality} and the city has grown through the 
      years to unite more than ${this.population} people to this day. It was built around ${this.builtAround}.
      Its government is ${this.government}.
    `
  }
}

registerClass(RandomCity)
