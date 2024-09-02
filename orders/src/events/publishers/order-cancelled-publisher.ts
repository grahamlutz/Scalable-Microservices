import { Publisher, OrderCancelledEvent, Subjects } from "@gtl-tix/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}