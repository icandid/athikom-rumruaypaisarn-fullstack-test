import {Router} from 'express'
import * as eventsController from '../../controllers/events'

const router = Router()

router.get('/', eventsController.index)
router.get('/:id', eventsController.show)
router.post('/', eventsController.createValidation, eventsController.create)
router.patch('/:id', eventsController.updateValidation, eventsController.update)
router.delete('/:id', eventsController.del)

export const EventsRoutes = router
