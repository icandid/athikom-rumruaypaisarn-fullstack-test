import db from '../db'

const tableName = 'events'

type EventID = number

interface Event {
  id: EventID
  name: string
  description: string
  owner: string
  createdAt: string
  updatedAt: string
}

export type EventPayload = Pick<Event, 'name' | 'description' | 'owner'>

async function all(): Promise<Event[]> {
  return db(tableName)
}

async function get(id: EventID): Promise<Event | undefined> {
  return db(tableName).where({id}).first()
}

async function create(payload: EventPayload): Promise<Event> {
  const now = new Date().toISOString()
  const newEvent = {
    ...payload,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db(tableName).insert(newEvent)
  return {
    id: result[0],
    ...newEvent,
  }
}

async function update(
  id: EventID,
  payload: Partial<EventPayload>,
): Promise<Event | undefined> {
  const updatedEvent = {
    ...payload,
    updatedAt: new Date().toISOString(),
  }
  const result = await db(tableName).where({id}).update(updatedEvent)

  if (result === 0) {
    return
  }

  return db(tableName).where({id}).first()
}

async function del(id: EventID) {
  return db(tableName).where({id}).del()
}

export {all, get, create, update, del}
