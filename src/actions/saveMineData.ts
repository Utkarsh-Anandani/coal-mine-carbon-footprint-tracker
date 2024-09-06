"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MineData from "@/models/MineData";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { zfd } from "zod-form-data";

const FugitiveEmissionsSchema = zfd.formData({
  coalMined: zfd.numeric(),
  degree: zfd.text(
    z.enum([
      "seam-degree-I",
      "seam-degree-II",
      "seam-degree-III",
      "mine-degree-I",
      "mine-degree-II",
      "mine-degree-III",
    ])
  ),
});

const FuelUsageSchema = zfd.formData({
  excavation: zfd.numeric(),
  transportation: zfd.numeric(),
  equipments: zfd.numeric(),
});

const ElectricityUsageSchema = zfd.formData({
  equipments: zfd.numeric(),
  others: zfd.numeric(),
});

const ExplosivesUsageSchema = zfd.formData({
  weight: zfd.numeric(),
});

const MineSchema = zfd.formData({
  openCast: zfd.checkbox(),
  fugitiveEmissions: FugitiveEmissionsSchema,
  fuelUsage: FuelUsageSchema,
  electricityUsage: ElectricityUsageSchema,
  explosivesUsage: ExplosivesUsageSchema,
});

const MineDataSchema = zfd.formData({
  mines: z.array(MineSchema),
  from: zfd.text(z.date()),
  to: zfd.text(z.date()),
});

export async function saveMineData(formData: FormData) {
  await connectDB();
  const safeData = MineDataSchema.safeParse(formData);
  if (safeData.success === false) {
    throw new Error("Invalid data");
  }
  const data = safeData.data;
  // get session
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if (!user) {
    throw new Error("User not found");
  }
  // save data
  const savedData = await MineData.create({
    owner: user,
    mines: data.mines,
    from: new Date(data.from),
    to: new Date(data.to),
  });

  console.log("saved data", savedData);
}
