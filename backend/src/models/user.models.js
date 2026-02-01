import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 7,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    resumeHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],

    subscriptionTier: {
      type: String,
      enum: ["basic", "pro", "enterprise"],
      default: "basic",
    },

    aiCredits: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);
// hashing password before saving it
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
