import { AreaChartComponent } from "@/components/charts/area-chart";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { EmissionBreakdownChart } from "@/components/charts/EmissionBreakdownChart";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const chartData = [
  { source: "fugitive", emissions: 275, fill: "var(--color-fugitive)" },
  { source: "excavation", emissions: 200, fill: "var(--color-excavation)" },
  {
    source: "transportation",
    emissions: 287,
    fill: "var(--color-transportation)",
  },
  { source: "equiments", emissions: 173, fill: "var(--color-equiments)" },
  { source: "electricity", emissions: 190, fill: "var(--color-electricity)" },
  { source: "explosives", emissions: 100, fill: "var(--color-explosives)" },
];

const chartConfig = {
  emissions: {
    label: "Emissions",
  },
  fugitive: {
    label: "fugitive",
    color: "hsl(var(--chart-1))",
  },
  excavation: {
    label: "excavation",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "transportation",
    color: "hsl(var(--chart-3))",
  },
  equiments: {
    label: "equiments",
    color: "hsl(var(--chart-4))",
  },
  electricity: {
    label: "electricity",
    color: "hsl(var(--chart-5))",
  },
  explosives: {
    label: "explosives",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export default function Home() {
  return (
    <div className="mx-auto max-w-[1500px] px-2">
      <h1 className="mt-4 text-xl">Dashboard</h1>
      <Button asChild variant="outline" className="mt-4">
        <Link href="/create-mine-form">
          <PlusIcon /> Add Data
        </Link>
      </Button>
      <div className="isolate z-20 grid grid-cols-1 gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
        <EmissionBreakdownChart
          chartDataProp={chartData}
          chartConfigProp={chartConfig}
        />
        {/* the error in console is because of rechart, it might soon be fixed: https://github.com/recharts/recharts/issues/3615 */}
        <BarChartComponent />
        <AreaChartComponent />
      </div>
    </div>
  );
}
