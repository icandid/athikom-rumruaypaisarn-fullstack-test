import {ValidationOptions} from 'joi'

export function validate(
  schema: any,
  payload: any,
  options: ValidationOptions = {},
) {
  const config = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    ...options,
  }
  return schema.validate(payload, config)
}
