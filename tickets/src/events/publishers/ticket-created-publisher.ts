import { Publisher, Subjects, TicketCreatedEvent } from '@gtl-tix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}