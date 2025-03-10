import { useGetTradesForSymbol } from "@/api/binance/use-get-trades-for-symbol";
import { TransactionChartWrapper } from "./TransactionChart.styles";
import { CircularProgress, Typography } from "@mui/material";
import { EChartsOption } from "echarts";
import dynamic from "next/dynamic";
import { FC } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type TransactionChartProps = { symbol: string };

const TransactionChart: FC<TransactionChartProps> = ({ symbol }) => {
  const { trades, isTradesFetching, isTradesFetchingError } =
    useGetTradesForSymbol(symbol);

  const options: EChartsOption = {
    title: {
      text: `${symbol} volume transactions`,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params: unknown) => {
        if (!Array.isArray(params)) return "No data";
        if (!params.length) return "No data";
        const { value } = params[0];
        return `Time: ${new Date(value[0]).toLocaleTimeString()} <br>Price: ${
          value[2]
        } <br>Volume: ${value[1].toFixed(6)}`;
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
        data: trades.map((d) => [d.time, d.volume, d.price]),
        itemStyle: {
          color: "#1876d1",
        },
      },
    ],
  };

  return (
    <TransactionChartWrapper>
      {trades.length === 0 && isTradesFetching ? (
        <CircularProgress />
      ) : (
        <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
      )}
      {isTradesFetchingError && !isTradesFetching && (
        <Typography variant="h5">Cannot load trades</Typography>
      )}
    </TransactionChartWrapper>
  );
};

export default TransactionChart;
