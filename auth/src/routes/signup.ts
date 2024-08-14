import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup', 
  [
    body('email')
      .isEmail()
      .withMessage('must use valid email address'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage('password must be between 4 and 30 characters')
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log('creating user');
    throw new DatabaseConnectionError();
    const { email, password } = req.body;

    res.send({});
  }
);

export { router as signupRouter };