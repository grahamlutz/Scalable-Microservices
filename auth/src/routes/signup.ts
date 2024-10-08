import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@gtl-tix/common';
import { User } from '../models/user';

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    };

    const user = User.build({ email, password});
    await user.save();

    // generate JWT 
    const userJwt = jwt.sign( {
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY as string);

    // store jwt on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };