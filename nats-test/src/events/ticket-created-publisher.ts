import { Publisher, TicketCreatedEvent, Subjects } from '@gtl-tix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}