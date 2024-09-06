"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartData = [
  { month: "January 2015", currentFootprint: 500, predictedFootprint: 500 },
  { month: "June 2015", currentFootprint: 400, predictedFootprint: 500 },
  { month: "January 2016", currentFootprint: 455, predictedFootprint: 500 },
  { month: "June 2016", currentFootprint: 480 },
  { month: "January 2017", currentFootprint: 300 },
  { month: "June 2017", currentFootprint: 380 },
  { month: "January 2018", currentFootprint: 380 },
  { month: "June 2018", currentFootprint: 300 },
  { month: "January 2019", currentFootprint: 275 },
  { month: "June 2019", currentFootprint: 295 },
  { month: "January 2020", currentFootprint: 320 },
  { month: "June 2020", currentFootprint: 200 },
  { month: "January 2021", currentFootprint: 275 },
  { month: "June 2021", currentFootprint: 260 },
  { month: "January 2022", currentFootprint: 220 },
  { month: "June 2022" },
  { month: "January 2023" },
  { month: "June 2023" },
  { month: "January 2024" },
  { month: "June 2024" },
  { month: "January 2025" },
  { month: "June 2025" },
  { month: "January 2026", predictedFootprint: 250 },
  { month: "June 2026" },
  { month: "January 2027" },
  { month: "June 2027" },
  { month: "January 2028" },
  { month: "June 2028" },
  { month: "January 2029" },
  { month: "June 2029" },
  { month: "January 2030", predictedFootprint: 200 },
];

const chartConfig = {
  currentFootprint: {
    label: "Current Footprint",
    color: "hsl(var(--chart-1))",
  },
  predictedFootprint: {
    label: "Predicted Footprint",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PredictionChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction of Carbon Footprint</CardTitle>
        <CardDescription>Jan 2015 - June 2030</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="currentFootprint"
              type="natural"
              stroke="tranparent"
              strokeWidth={2}
              dot={{
                fill: "var(--color-currentFootprint)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
