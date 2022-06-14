import{ model, Schema } from "mongoose";

interface IHistoryAnimal {
  nomeDono: string;
  emailDono: string;
  nomeAnimal: string;
  servico: string;
  realizada: string;
}

const kittySchema = new Schema<IHistoryAnimal>({});

export const HistoryAnimal = model<IHistoryAnimal>("historyanimals", kittySchema)

/*
{
  "nomeDono": "Manoel Rocha",
  "emailDono": "manoeldev@gmail.com",
  "nomeAnimal": "Dog",
  "servico": "tosa"
}

{
  "nomeDono": "Manoel Rocha",
  "emailDono": "manoeldev@gmail.com",
  "nomeAnimal": "Dog",
  "servico": "banho"
}

{
  "nomeDono": "Manoel Rocha",
  "emailDono": "manoeldev@gmail.com",
  "nomeAnimal": "Dog",
  "servico": "aplicação medicamentos"
}
*/
