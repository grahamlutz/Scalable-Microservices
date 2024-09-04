import { Subjects, Publisher, PaymentCreatedEvent } from "@gtl-tix/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}