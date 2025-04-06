"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
const chartData = [
  { month: "January", ulundi: 186, durban: 80 },
  { month: "February", ulundi: 305, durban: 200 },
  { month: "March", ulundi: 237, durban: 120 },
  { month: "April", ulundi: 73, durban: 190 },
  { month: "May", ulundi: 209, durban: 130 },
  { month: "June", ulundi: 214, durban: 140 },
];

const chartConfig = {
  ulundi: {
    label: "Ulundi",
    color: "hsl(var(--chart-1))",
  },
  durban: {
    label: "Durban",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ConversionRateStat() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion rate</CardTitle>
        <CardDescription>
          Showing conversion for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="durban"
              type="natural"
              fill="var(--color-durban)"
              fillOpacity={0.4}
              stroke="var(--color-durban)"
              stackId="a"
            />
            <Area
              dataKey="ulundi"
              type="natural"
              fill="var(--color-ulundi)"
              fillOpacity={0.4}
              stroke="var(--color-ulundi)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
