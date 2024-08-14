import mongoose from "mongoose";

// An interface to describe properties required for new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describe the properties a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Use this to create new users instead of `new User(...)` bc 
// TypeScript and Mongoose don't play well together
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };