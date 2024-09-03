import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@gtl-tix/common";

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

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };