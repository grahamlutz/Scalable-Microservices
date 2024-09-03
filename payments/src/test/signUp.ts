import { app } from '../app';
import request from 'supertest';

export const signUp =  async () => {
  const email = 'test@test.com';
  const password = 'password';

  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })

  const cookie = await signUpResponse.get('Set-Cookie');

  return cookie;
}