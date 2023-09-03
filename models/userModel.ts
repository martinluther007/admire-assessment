import { Schema, model, Types, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  id: Types.ObjectId;
  comparePassword: (password: string, input: string) => Boolean;
}

const userSchema = new Schema<Iuser>({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    // unique: true,
  },
  // @ts-ignore
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email. please put another value",
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, "A user must have a password"],
    minLength: [8, "A password must have a minimum of 8 characters"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // @ts-ignore

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  inputPassword: string,
  storedPassword: string
) {
  return await bcrypt.compare(inputPassword, storedPassword);
};

const User = model("user", userSchema);

export default User;
