import{ model, Schema } from "mongoose";

interface IServices {
 dados: string[]
}

const kittySchema = new Schema<IServices>({});

export const Services = model<IServices>("services", kittySchema)
