import{ model, Schema } from "mongoose";

interface IAnimal {
  donoAnimal: {
    nome: string;
    email: string;
  },
  dadosAnimal: {
    nome: string;
    especie: string;
    raca: string;
    nascimento: string;
    sexo: string;
    observacoes?: string;
  }
}

const kittySchema = new Schema<IAnimal>({
  donoAnimal: {type: Object, required: true},
  dadosAnimal: {type: Object, required: true}
});

export const Animal = model<IAnimal>("Animals", kittySchema)
