import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import {apiRouter} from './routes/api'
import {loadErrorHandlers} from './middlewares/error-handling'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Events')
})

app.use('/api', apiRouter)

loadErrorHandlers(app)

export default app
