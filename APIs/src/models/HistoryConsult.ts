import{ model, Schema } from "mongoose";

interface IHistoryConsult {
  nomeDono: string;
  emailDono: string;
  nomeAnimal: string;
  descricao: string;
  medicamentos: string;
  realizada: Date;
  retorno: {};
}

const kittySchema = new Schema<IHistoryConsult>({});

export const HistoryConsult = model<IHistoryConsult>("historyConsult", kittySchema)
