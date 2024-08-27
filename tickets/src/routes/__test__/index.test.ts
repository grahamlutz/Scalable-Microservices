import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: String, price: Number) => {
  return request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({ title, price })
}

it('can fetch a list of tickets', async () => {
  const ticketData = [
    {
      title: 'One',
      price: 10
    },
    {
      title: 'Two',
      price: 20
    },
    {
      title: 'Three',
      price: 30
    }
  ]

  ticketData.forEach(async ({title, price}) => {
    await createTicket(title, price);
  })

  const response = await request(app)
    .get(`/api/tickets/`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
  expect(response.body[0].title).toEqual('One');
});