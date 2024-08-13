import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('hello from the signupRouter');
});

export { router as signupRouter };