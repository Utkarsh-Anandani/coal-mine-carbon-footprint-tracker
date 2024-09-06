import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import DashboardCharts from "./_components/DashboardCharts";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1500px] px-2">
      <h1 className="mt-4 text-xl">Dashboard</h1>
      <Button asChild variant="outline" className="mt-4">
        <Link href="/create-mine-form">
          <PlusIcon /> Add Data
        </Link>
      </Button>
      <DashboardCharts />
    </div>
  );
}
