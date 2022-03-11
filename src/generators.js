import random from 'lodash/random'
import { pickRandom } from '@/utils'
import {
  adverbs,
  maleNames,
  femaleNames,
  lastNames,
  nickNames,
  eyeColors,
  hairColors,
  skinColors,
  smallSizes,
  normalSizes,
  largeSizes,
  strong,
  weak,
  short,
  tall,
  poor,
  rich,
  stateMoods,
  intelligence,
  traits,
  motives,
  jobs,
  jobLevels,
  jobDomains,
  cityNames,
  cityRecognitions,
  cityAdjectives1,
  cityAdjectives2,
  cityAdjectives3,
  cityBuildingAdjectives,
  cityBuildings,
  citySkylineAdjectives, cityQualities, cityCultures, cityPlaces,
} from '@/words'
import { capitalize } from 'lodash';

export const city = () => {
  const name = pickRandom(cityNames)
  const population = random(300000, 4500000)
  const description = `
    ${name} is a ${random(cityAdjectives1)} ${random(cityAdjectives2)} ${random(cityAdjectives3)}.
     The skyline is ${random(citySkylineAdjectives)} with ${random(cityBuildingAdjectives)} skyscrapers 
     and ${random(cityBuildings)}. ${capitalize(random(cityCultures))} from all over the world come to it 
     for its ${random(cityRecognitions)} and its numerous ${random(cityPlaces)}. It is known for its 
     ${random(cityQualities)} and the city has grown through the years to unite more than ${population} 
     people to this day. 
   `
  return {
    name,
    population,
    description,
  }
}

export const district = () => {
  // name
  // description
}

export const building = () => {
  // name
  // icon
  // description
  // commercial domain
  // opening hours
}

export const room = () => {
  // items
}

export const npc = ({ female, kid, old } = {}) => {
  const firstname = pickRandom(female ? femaleNames : maleNames)
  const lastname = pickRandom(lastNames)
  const nickname = pickRandom(nickNames)
  const age = kid
    ? random(1, 17)
    : (old
      ? random(61, 90)
      : random(18, 60)
    )
  const eyeColor = pickRandom(eyeColors)
  const hairColor = pickRandom(hairColors)
  const skinColor = pickRandom(skinColors)
  let build
  switch (random(1, 3)) {
    case 1:
      build = pickRandom(smallSizes)
      break
    case 2:
      build = pickRandom(normalSizes)
      break
    default:
      build = pickRandom(largeSizes)
  }
  let size
  switch (random(1, 2)) {
    case 1:
      size = pickRandom(short)
      break
    default:
      size = pickRandom(tall)
  }
  let strength
  switch (random(1, 2)) {
    case 1:
      strength = pickRandom(weak)
      break
    default:
      strength = pickRandom(strong)
  }
  let status = ''
  if (!kid) {
    switch (random(1, 2)) {
      case 1:
        strength = pickRandom(poor)
        break
      default:
        strength = pickRandom(rich)
    }
  }
  const mood = pickRandom(stateMoods)
  const moti = pickRandom(motives)
  const mind = pickRandom(intelligence)
  const trait = pickRandom(traits)
  const job = pickRandom(jobs)
  const jobLevel = pickRandom(jobLevels)
  const jobDomain = pickRandom(jobDomains)

  const npc = {
    firstname,
    lastname,
    nickname,
    age,
    eyeColor,
    hairColor,
    skinColor,
    motives: moti,
    build: `${pickRandom(adverbs)} ${build}`,
    size: `${pickRandom(adverbs)} ${size}`,
    strength: `${pickRandom(adverbs)} ${strength}`,
    status: `${pickRandom(adverbs)} ${status}`,
    mood: `${pickRandom(adverbs)} ${mood}`,
    mind: `${pickRandom(adverbs)} ${mind}`,
    trait,
    job: `${jobLevel} ${jobDomain} ${job}`,
  }

  const id = female ? 'she' : 'he'
  const his = female ? 'her' : 'his'

  return {
    ...npc,
    description: (name = true) => `${name ? `${capitalize(npc.firstname)} ${capitalize(npc.lastname)}` : ''}, 
     also known as "${capitalize(npc.nickname)}", is a ${npc.age} years old, ${npc.skinColor} skin, 
     ${npc.eyeColor} eyes, ${npc.build} and ${npc.size}, ${npc.job}. ${capitalize(his)} main motive in life is 
     to ${npc.motives}. ${capitalize(id)} is ${npc.mind}, ${npc.trait} and a ${npc.mood} type of person.`,
  }
}

/**
 * Generate random loot from a list of classes
 *
 * @param classes {Class[]}
 * @param min {number} minimum number to generate
 * @param max {number} maximum number to generate
 *
 */
export const generateLoot = (classes, min = 1, max = 5) => {
  return new Array(random(min, max)).fill(0).map(() => pickRandom(classes))
}
