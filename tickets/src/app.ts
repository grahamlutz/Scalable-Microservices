import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@gtl-tix/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from './routes/show';
import { getTicketsRouter } from './routes/index';

const app = express();

// trust traffic from nginx proxy
app.set('trust proxy', true);

// Middlewares
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

// Routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(getTicketsRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };