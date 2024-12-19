import { Router, type Router as RouterType } from 'express'

const router: RouterType = Router()

// import routes
import vehicleRouter from '../resources/vehicles/routes'

// Higher level routes definition
router.use('/vehicles', vehicleRouter)

export default router
