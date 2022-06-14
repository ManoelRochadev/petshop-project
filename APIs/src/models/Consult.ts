import{ model, Schema } from "mongoose";

interface IDates {
    datasGeradas: Date;
}

const kittySchema = new Schema<IDates>({
    datasGeradas: {type: Date}
});

export const Dates = model<IDates>("dates", kittySchema)




