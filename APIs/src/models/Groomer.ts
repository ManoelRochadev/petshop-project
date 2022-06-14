import{ model, Schema } from "mongoose";

interface IGroomer {
  name: string;
  email: string;
  password: string;
  passwordRecovery: string;
  activities: string[];
}

const kittySchema = new Schema<IGroomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordRecovery: { type: String, required: true },
  activities: { type: [String], required: true },
});

export const Groomer = model<IGroomer>("Groomer", kittySchema)
