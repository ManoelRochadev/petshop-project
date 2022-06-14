import{ model, Schema } from "mongoose";

interface IDoctor {
  name: string;
  email: string;
  password: string;
  passwordRecovery: string;
  CRMV: string;
  especializacao: string;
}

const kittySchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordRecovery: { type: String, required: true },
  CRMV: { type: String, required: true },
  especializacao: { type: String, required: true },
});

export const Doctor = model<IDoctor>("Doctor", kittySchema)
