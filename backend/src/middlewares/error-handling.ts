import {Application, Request, Response} from 'express'
import config from '../config'

export function loadErrorHandlers(app: Application) {
  // catch 404 errors and forward to error handler
  app.use((req, res, next) => {
    interface BetterError extends Error {
      status?: number
    }

    const error: BetterError = new Error('Not Found')
    error.status = 404
    next(error)
  })

  app.use((error: any, _req: Request, res: Response, next: any) => {
    if (res.headersSent) {
      next(error)
    } else if (error.name === 'ValidationError') {
      const statusCode = 400
      const message = `Validation error: ${error.details
        .map((d: any) => d.message)
        .join(', ')}`
      res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message,
      })
    } else {
      const inDebugMode = config.env === 'development'
      const statusCode = error.status || 500
      res.status(statusCode)
      res.json({
        status: 'error',
        message: inDebugMode ? error.message : 'Internal Server Error',
        code: inDebugMode ? statusCode : 'INTERNAL_SERVER_ERROR',
        data: inDebugMode ? error : {},
      })
    }
  })
}
