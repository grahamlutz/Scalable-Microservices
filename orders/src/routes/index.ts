import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError, BadRequestError } from '@gtl-tix/common';


const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {

    res.send({});
});

export { router as indexOrdersRouter };
