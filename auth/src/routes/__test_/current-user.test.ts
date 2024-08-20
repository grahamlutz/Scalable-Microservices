import request from 'supertest';
import { app } from '../../app';
import { signUp } from '../../test/signUp';

it('resonds with details about current user', async () => {
  const cookie = await signUp();

  if (!cookie) return;
  
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});