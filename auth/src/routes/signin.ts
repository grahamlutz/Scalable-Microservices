import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials 1');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials 2');
    }

    // generate JWT 
    const userJwt = jwt.sign( {
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_KEY as string);

    // store jwt on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);

    // res.send('hello from the signinRouter');
  }
);

export { router as signinRouter };