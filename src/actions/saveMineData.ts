import { connectDB } from "@/lib/mongodb";

export async function saveMineData() {
  await connectDB();
}
