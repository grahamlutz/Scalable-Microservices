import { Ticket } from "../ticket";

const buildTicket = () => {
  return Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123'
  });
} 

it('implements optimistic concurrency control', async () => {
  // Create an instance of a ticket
  const ticket = buildTicket();
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 15 });
  secondInstance!.set({ price: 25 });

  await firstInstance!.save();
  expect(firstInstance!.version).toEqual(1);

  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error('Should not reach this point');
});  

it('increments the version number on multiple saves', async () => {
  const ticket = buildTicket();
  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});  