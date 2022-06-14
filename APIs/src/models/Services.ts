import{ model, Schema } from "mongoose";

interface IServices {
 data: [];
}

const kittySchema = new Schema<IServices>({});

export const Services = model<IServices>("services", kittySchema)
