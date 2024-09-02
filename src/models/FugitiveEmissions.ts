import mongoose, { Document, Model } from "mongoose";

interface FugitiveEmission {
  mineType: string;
  gasReleased: string;
  description: string;
  seamDegree?: 1 | 2 | 3;
  mineDegree?: 1 | 2 | 3;
  postMining: boolean;
  emissionFactor: number;
}

const FugitiveEmissionsSchema = new mongoose.Schema<FugitiveEmission>({
  mineType: {
    type: String,
    required: true,
  },
  gasReleased: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seamDegree: {
    type: Number,
  },
  mineDegree: {
    type: Number,
  },
  postMining: {
    type: Boolean,
    required: true,
  },
  emissionFactor: {
    type: Number,
    required: true,
  },
});

const FugitiveEmission: Model<FugitiveEmission> =
  mongoose.models.FugitiveEmission ||
  mongoose.model<FugitiveEmission>("FugitiveEmission", FugitiveEmissionsSchema);

export default FugitiveEmission;
