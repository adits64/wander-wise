import { Schema, model } from "mongoose";

const BaggageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Baggage = model("Baggage", BaggageSchema);

export default Baggage;
