import request from 'supertest'
import app from '../app'
import db from '../db'
import type {EventPayload} from '../models/event'
import {eventBuilder} from './utils/event-builder'

function createEvent(event: EventPayload) {
  return request(app).post('/api/events').send(event).expect(201)
}

beforeEach(async () => {
  await db.migrate.latest()
})

afterEach(async () => {
  await db.migrate.rollback()
})

test('get all events', async () => {
  const response = await request(app).get('/api/events').expect(200)
  const {status, data} = response.body

  expect(status).toBe('success')
  expect(Array.isArray(data)).toBe(true)
})

test('create event', async () => {
  const event = eventBuilder()
  const response = await createEvent(event)
  const {status, data} = response.body

  expect(status).toBe('success')
  expect(data.name).toBe(event.name)
  expect(data.description).toBe(event.description)
  expect(data.owner).toBe(event.owner)
})

test('get existing event', async () => {
  const event = eventBuilder()
  const createResponse = await createEvent(event)
  const {id} = createResponse.body.data
  const response = await request(app).get(`/api/events/${id}`).expect(200)
  const {status, data} = response.body

  expect(status).toBe('success')
  expect(data.name).toBe(event.name)
  expect(data.description).toBe(event.description)
  expect(data.owner).toBe(event.owner)
})

test('get non-exists event', async () => {
  const fakeID = 123456
  await request(app).get(`/api/events/${fakeID}`).expect(404)
})

test('update event', async () => {
  const event = eventBuilder()
  const createResponse = await createEvent(event)
  const {id} = createResponse.body.data
  const updateEvent = {
    name: eventBuilder().name,
  }
  const response = await request(app)
    .patch(`/api/events/${id}`)
    .send(updateEvent)
    .expect(200)
  const {status, data} = response.body

  expect(status).toBe('success')
  expect(data.name).toBe(updateEvent.name)
})

test('delete event by id', async () => {
  const event = eventBuilder()
  const createResponse = await createEvent(event)
  const {id} = createResponse.body.data
  await request(app).delete(`/api/events/${id}`).expect(204)
  await request(app).get(`/api/events/${id}`).expect(404)
})
