"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

export const description = "A donut chart with text";
/*
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
*/

export function EmissionBreakdownChart({
  chartDataProp,
  chartConfigProp,
}: {
  chartDataProp: {
    source: string;
    emissions: number;
    fill: string;
  }[];
  chartConfigProp: ChartConfig;
}) {
  const totalEmissions = React.useMemo(() => {
    return chartDataProp.reduce((acc, curr) => acc + curr.emissions, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Breakdown of Emissions of the Mine</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigProp}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataProp}
              dataKey="emissions"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmissions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tons of CO2
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Expected to rise with amount of coal{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing breakdown of Emissions from Different activities
        </div>
      </CardFooter>
    </Card>
  );
}
