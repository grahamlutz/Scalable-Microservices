import { Listener, OrderCreatedEvent, Subjects } from "@gtl-tix/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
  });

    await order.save();

    msg.ack();
  }
}