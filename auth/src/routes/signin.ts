import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('email but be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must supply a password')
  ],
  validateRequest,
  (req: Request, res: Response) => {
    // res.send('hello from the signinRouter');
  }
);

export { router as signinRouter };