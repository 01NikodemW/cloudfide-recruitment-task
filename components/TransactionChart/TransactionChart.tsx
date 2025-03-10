import { useGetData } from "@/api/binance/use-get-data";
import { TransactionChartWrapper } from "./TransactionChart.styles";
import { CircularProgress } from "@mui/material";
import { EChartsOption } from "echarts";
import dynamic from "next/dynamic";
import { FC } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type TransactionChartProps = { symbol: string };

const TransactionChart: FC<TransactionChartProps> = ({ symbol }) => {
  const { binanceData, isBinanceDataFetching } = useGetData(symbol);

  const options: EChartsOption = {
    title: {
      text: `${symbol} volume transactions`,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params: any) => {
        if (!params.length) return "No data";
        const { value } = params[0];
        return `Time: ${new Date(value[0]).toLocaleTimeString()} <br>Price: ${
          value[2]
        } <br>Volume: ${value[1]}`;
      },
    },
    xAxis: [
      {
        type: "time",
        boundaryGap: [0, "5%"],
        axisLabel: {
          formatter: (vaule: number) => {
            return new Date(vaule).toLocaleTimeString();
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Volume",
      },
    ],
    series: [
      {
        name: "Volume",
        type: "bar",
        data: binanceData.map((d) => [d.time, d.volume, d.price]),
        itemStyle: "#f00",
      },
    ],
  };

  return (
    <TransactionChartWrapper>
      {binanceData.length === 0 && isBinanceDataFetching ? (
        <CircularProgress />
      ) : (
        <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
      )}
    </TransactionChartWrapper>
  );
};

export default TransactionChart;
