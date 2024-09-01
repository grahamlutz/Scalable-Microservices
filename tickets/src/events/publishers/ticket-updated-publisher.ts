import { Publisher, Subjects, TicketUpdatedEvent } from "@gtl-tix/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}