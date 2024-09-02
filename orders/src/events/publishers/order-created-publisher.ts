import { Publisher, OrderCreatedEvent, Subjects } from "@gtl-tix/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}