import {Router} from 'express'
import {EventsRoutes} from './events'

const router = Router()

router.use('/events', EventsRoutes)

export const apiRouter = router
