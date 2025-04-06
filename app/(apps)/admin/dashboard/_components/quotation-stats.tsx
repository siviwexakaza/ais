"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { month: "July", ulundi: 314, durban: 180 },
  { month: "August", ulundi: 214, durban: 140 },
  { month: "Sptember", ulundi: 214, durban: 140 },
  { month: "October", ulundi: 214, durban: 140 },
  { month: "November", ulundi: 214, durban: 140 },
  { month: "December", ulundi: 214, durban: 140 },
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

export function QuotationsStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotations overview</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="ulundi" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="durban" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing quotation amounts for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
