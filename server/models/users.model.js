const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: [8, "password must be at least 8 characters"],
    },
  },
  {timestamps: true}
);

//middleware to hash password before saving to db using bcrypt
UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("password hashed", hashedPassword);
    this.password = hashedPassword;
    next();
  } catch {
    console.log("error saving user :(", error);
  }
});

module.exports = mongoose.model("User", UserSchema);
