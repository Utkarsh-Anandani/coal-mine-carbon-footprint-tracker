"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MineData from "@/models/MineData";
import { MineDataType, MineDataSchema } from "@/schema/zod/MineData";
import { getServerSession } from "next-auth";

export async function saveMineData(mineData: MineDataType) {
  await connectDB();
  const safeData = MineDataSchema.safeParse(mineData);
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
