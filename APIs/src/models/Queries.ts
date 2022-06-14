import{ model, Schema } from "mongoose";

interface IQueries {
  nomeDono: string;
  emailDono: string;
  nomeAnimal: string;
  medico: string;
  descricao: string;
  horario: {
    segunda: string;
    terca: string;
  };
}

const kittySchema = new Schema<IQueries>({
  nomeDono: { type: String , required: true },
  emailDono: { type: String , required: true },
  nomeAnimal: { type: String , required: true },
  medico: { type: String , required: true },
  descricao: { type: String , required: true },
  horario: {},
});

export const Queries = model<IQueries>("Queries", kittySchema)
