import mongoose, { Document, Model, Schema } from "mongoose";

export interface MineInterface {
  openCast: Boolean;
  fugitiveEmissions: {
    coalMined: Number;
    degree: "seam-degree-I" | "seam-degree-II" | "seam-degree-III" | "mine-degree-I" | "mine-degree-II" | "mine-degree-III";
  };
  fuelUsage: {
    excavation: Number;
    transportation: Number;
    equipments: Number;
  };
  electricityUsage: {
    equipments: Number;
    others: Number;
  };
  explosivesUsage: {
    weight: Number;
  };
}
interface MineSchemaInterface extends Document {
  owner: String;
  mines: MineInterface[];
  from: Date;
  to: Date;
}

const MineSchema = new Schema<MineSchemaInterface>({});

const MineData: Model<MineSchemaInterface> =
  mongoose.models.MineData ||
  mongoose.model<MineSchemaInterface>("MineData", MineSchema);
export default MineData;
