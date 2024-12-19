import { NextFunction, Request, Response } from 'express'
import logger from '../common/logger'

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method}\t${req.headers.origin}\t${req.url}`)
  next()
}

export default requestLogger
