import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  company?: string;
  position?: string;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    company: String,
    position: String,
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

schema.method(
  "comparePassword",
  function comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
  }
);

// 3. Create a Model.
const User = model<IUser, UserModel>("User", schema);

export { User, IUser };
