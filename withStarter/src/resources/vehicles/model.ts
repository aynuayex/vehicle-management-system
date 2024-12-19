import { model, Schema } from "mongoose";
import VehicleInterface from "./interface";

const vehicleSchema = new Schema<VehicleInterface>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "maintenance"],
      default: "available",
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 15,
    },
  },
  {
    timestamps: true,
  },
);

export default model<VehicleInterface>("Vehicle", vehicleSchema);
