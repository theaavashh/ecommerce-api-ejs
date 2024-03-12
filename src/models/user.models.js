import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "User",
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const data = this;
  if (!data.isModified("password")) return next();
  const haspassword = await bcrypt.hash(data.password, 10);
  data.password = haspassword;
  return data;
});

const User = mongoose.model("User", UserSchema);

export default User;
