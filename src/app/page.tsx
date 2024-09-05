import { BarChartComponent } from "@/components/bar-chart";
import { PieChartComponent } from "@/components/pie-chart";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1500px] px-2">
      <h1 className="mt-4 text-xl">Dashboard</h1>
      <Link href="/create-mine-form">
        <div className="flex max-w-40 flex-col items-center">
          <div className="relative mt-2 flex aspect-square w-full items-center justify-center rounded-md border">
            <div className="absolute h-[2px] w-1/4 rounded-full bg-secondary-foreground"></div>
            <div className="absolute h-[2px] w-1/4 rotate-90 rounded-full bg-secondary-foreground"></div>
          </div>
          <span>Add Data</span>
        </div>
      </Link>
      {/* the error in console is because of rechart, it might soon be fixed: https://github.com/recharts/recharts/issues/3615 */}
      <div className="flex py-8">
        <PieChartComponent />
        <BarChartComponent />
      </div>
    </div>
  );
}
