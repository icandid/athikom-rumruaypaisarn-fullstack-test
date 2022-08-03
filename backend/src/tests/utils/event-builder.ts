import {faker} from '@faker-js/faker'
import type {EventPayload} from '../../models/event'

export function eventBuilder(overrides: Partial<EventPayload> = {}) {
  return {
    name: faker.random.words(),
    description: faker.lorem.paragraph(),
    owner: faker.name.firstName(),
    ...overrides,
  }
}
