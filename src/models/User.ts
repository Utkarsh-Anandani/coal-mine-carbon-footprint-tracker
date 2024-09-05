import mongoose, { Document, Model, Schema } from "mongoose";

interface UserInterface extends Document {
  email: String;
  name: String;
  password: String;
}

const UserSchema = new Schema<UserInterface>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<UserInterface> =
  mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema);
export default User;
