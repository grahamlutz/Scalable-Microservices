import request from 'supertest';
import { app } from '../../app';

it('resonds with details about current user', async () => {
  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
  
  const cookie = signUpResponse.get('Set-Cookie');

  if (!cookie) return;
  
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});