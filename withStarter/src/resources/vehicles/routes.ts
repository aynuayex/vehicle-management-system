import { Router, type Router as RouterType } from 'express'
import { createVehicle, deleteVehicle, getVehicle, getAllVehicles, updateVehicle } from './controller'

const router: RouterType = Router()

router.route('/').get(getAllVehicles)
router.route('/:id').get(getVehicle)
router.route('/').post(createVehicle)
router.route('/:id').patch(updateVehicle)
router.route('/:id').delete(deleteVehicle)

export default router
