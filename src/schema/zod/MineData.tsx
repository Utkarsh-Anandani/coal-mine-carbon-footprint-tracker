import { z, ZodFormattedError } from "zod";

const FugitiveEmissionsSchema = z.object({
  coalMined: z.number(),
  degree: z
    .enum([
      "seam-degree-I",
      "seam-degree-II",
      "seam-degree-III",
      "mine-degree-I",
      "mine-degree-II",
      "mine-degree-III",
    ])
    .nullable(),
});

const FuelUsageSchema = z.object({
  excavation: z.number(),
  transportation: z.number(),
  equipments: z.number(),
});

const ElectricityUsageSchema = z.object({
  equipments: z.number(),
  others: z.number(),
});

const ExplosivesUsageSchema = z.object({
  weight: z.number(),
});

export const MineSchema = z.object({
  openCast: z.boolean(),
  fugitiveEmissions: FugitiveEmissionsSchema,
  fuelUsage: FuelUsageSchema,
  electricityUsage: ElectricityUsageSchema,
  explosivesUsage: ExplosivesUsageSchema,
});

export const MineDataSchema = z.object({
  mines: z.array(MineSchema),
  from: z.string().min(1),
  to: z.string().min(1),
});

// Infer TypeScript types from Zod schemas
export type MineType = z.infer<typeof MineSchema>;
export type MineErrorsType = ZodFormattedError<MineType>;

// Infer TypeScript types from Zod schemas
export type MineDataType = z.infer<typeof MineDataSchema>;
export type MineDataErrorsType = ZodFormattedError<MineDataType>;
