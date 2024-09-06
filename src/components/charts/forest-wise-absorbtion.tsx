"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A mixed bar chart";

const chartData = [
  {
    browser: "coniferous",
    sequestration: 275,
    fill: "var(--color-coniferous)",
  },
  { browser: "deciduous", sequestration: 200, fill: "var(--color-deciduous)" },
  { browser: "grassland", sequestration: 187, fill: "var(--color-grassland)" },
  { browser: "other", sequestration: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  sequestration: {
    label: "sequestration",
  },
  coniferous: {
    label: "Coniferous",
    color: "hsl(var(--chart-1))",
  },
  deciduous: {
    label: "Deciduous",
    color: "hsl(var(--chart-2))",
  },
  grassland: {
    label: "Grassland",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ForestWiseAbsorbtionComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forest Wise Carbon Sequestration Breakdown</CardTitle>
        <CardDescription>January 2020 - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="sequestration" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sequestration" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          you need to to plant more forest <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sequestration for the last 2 years
        </div>
      </CardFooter>
    </Card>
  );
}
