import express from 'express';
import { currentAbortController } from '../contacts';

export const cancelPreviousRequestMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (currentAbortController) {
    currentAbortController.abort();
  }
  next();
};
