"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import moment from "moment"

const chartConfig = {
  cxhorahj: {
    label: "Produção HJ",
    color: "hsl(var(--chart-1))",
  },
  cxhoraon: {
    label: "Produção ON",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartProd({ data }: any) {

  const chartProdHoje = data?.filter((ont: any) => (ont.Dia === 'H')).map((item: any) => ({ hora: item.Hora, cxhorahj: item.CxHora }));

  const chartProdOntem = data?.filter((ont: any) => (ont.Dia === 'O')).map((item: any) => ({ hora: item.Hora, cxhoraon: item.CxHora }));

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Produção - Hora</CardTitle>
        <CardDescription>{moment().format("DD/MM/YYYY")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart
            accessibilityLayer
            data={chartProdHoje}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hora"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="cxhorahj"
              type="natural"
              fill="var(--color-cxhorahj)"
              fillOpacity={0.4}
              stroke="var(--color-cxhorahj)"
              stackId="a"
            />
            {/* <Area
              dataKey="cxhoraon"
              type="natural"
              fill="var(--color-cxhoraon)"
              fillOpacity={0.4}
              stroke="var(--color-cxhoraon)"
              stackId="a"
            /> */}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
