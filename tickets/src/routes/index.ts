import express, { Request, Response, NextFunction } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@gtl-tix/common';

const router = express.Router();

router.get('/api/tickets/', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  if (!tickets) {
    throw new NotFoundError();
  };

  res.send(tickets);
});

export { router as getTicketsRouter };