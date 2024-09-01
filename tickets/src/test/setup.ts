import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

jest.setTimeout(100000);
jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = '3osnfvuet';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db?.collections();

  if (!collections) return ;

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`]
};