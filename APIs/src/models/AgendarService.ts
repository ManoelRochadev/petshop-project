import{ model, Schema } from "mongoose";

interface IAgendarservices {
  emailDono: string,
  nomeDono: string,
  nomeAnimal: string,
  servico: string,
  horarios: string
}

const kittySchema = new Schema<IAgendarservices>({
  emailDono: String,
  nomeDono: String,
  nomeAnimal: String,
  servico: String,
  horarios: {}
});

export const Agendarservices = model<IAgendarservices>("agendarservices", kittySchema)
