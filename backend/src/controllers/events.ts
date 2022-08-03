import {Request, Response, NextFunction} from 'express'
import Joi from 'joi'
import * as eventModel from '../models/event'
import {validate} from '../utils/schema-validation'
import {formatSuccess} from '../utils/format-response'

async function index(_req: Request, res: Response, _next: NextFunction) {
  const data = await eventModel.all()
  res.json(formatSuccess(data))
}

async function show(req: Request, res: Response, _next: NextFunction) {
  const {id} = req.params
  const data = await eventModel.get(parseInt(id))
  if (data) {
    res.json(formatSuccess(data))
  } else {
    res.sendStatus(404)
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await eventModel.create(req.body)
    res.status(201)
    res.json(formatSuccess(data))
  } catch (error) {
    next(error)
  }
}

function createValidation(req: Request, _res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    owner: Joi.string().required(),
  })
  const {error, value} = validate(schema, req.body)
  if (error) {
    next(error)
  } else {
    req.body = value
    next()
  }
}

async function update(req: Request, res: Response, _next: NextFunction) {
  const {id} = req.params
  const data = await eventModel.update(parseInt(id), req.body)
  if (data) {
    res.json(formatSuccess(data))
  } else {
    res.sendStatus(404)
  }
}

function updateValidation(req: Request, _res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    owner: Joi.string(),
  })
  const {error, value} = validate(schema, req.body)
  if (error) {
    next(error)
  } else {
    req.body = value
    next()
  }
}

async function del(req: Request, res: Response, _next: NextFunction) {
  const {id} = req.params
  const isSuccess = await eventModel.del(parseInt(id))
  const statusCode = isSuccess ? 204 : 404
  res.sendStatus(statusCode)
}

export {index, show, create, createValidation, update, updateValidation, del}
