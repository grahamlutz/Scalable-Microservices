import request from 'supertest';
import { app } from '../../app';

it('clears cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const signUpResponse = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  const signOutResponse = await request(app)
    .post('/api/users/signout')
    .send()
    .expect(200);

  expect(signOutResponse.get('Set-Cookie')![0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});
