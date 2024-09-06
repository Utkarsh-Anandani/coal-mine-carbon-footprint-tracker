import { EmissionBreakdownChart } from "@/components/charts/EmissionBreakdownChart";
import { ForestWiseAbsorbtionComponent } from "@/components/charts/forest-wise-absorbtion";
import { PredictionChartComponent } from "@/components/charts/prediction-chart";
import { ChartConfig } from "@/components/ui/chart";

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

export default function DashboardCharts() {
  return (
    <div className="isolate z-20 grid grid-cols-1 gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
      <EmissionBreakdownChart
        chartDataProp={chartData}
        chartConfigProp={chartConfig}
      />
      <PredictionChartComponent />
      <ForestWiseAbsorbtionComponent />
      {/* the error in console is because of rechart, it might soon be fixed: https://github.com/recharts/recharts/issues/3615 */}
      {/* <BarChartComponent />
        <AreaChartComponent /> */}
    </div>
  );
}
