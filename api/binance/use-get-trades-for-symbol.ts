import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { axiosInstance } from "@/api/axios-instance";
import { Trade } from "@/types/Trade";
import { ApiConstants } from "@/constants/api-constants";

type AggregatedData = Record<number, { volume: number; price: number }>;

type GetTradesForSymbolResponse = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};

const getTradesForSymbol = async (symbol: string): Promise<Trade[]> => {
  const url = "/api/v3/trades";

  const params = {
    symbol: symbol,
    limit: 1000,
  };

  try {
    const response = await axiosInstance.get(url, { params });
    const aggregatedData: AggregatedData = response.data.reduce(
      (acc: AggregatedData, trade: GetTradesForSymbolResponse) => {
        const time = Math.floor(trade.time / 1000) * 1000;
        const price = parseFloat(trade.price);
        const volume = parseFloat(trade.qty);

        if (!acc[time]) {
          acc[time] = { volume, price };
        } else {
          acc[time].volume += volume;
          acc[time].price = price;
        }
        return acc;
      },
      {}
    );

    return Object.entries(aggregatedData).map(([time, { volume, price }]) => ({
      time: Number(time),
      volume,
      price,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetTradesForSymbol(symbol: string) {
  const {
    data: trades = [],
    isFetching: isTradesFetching,
    isError: isTradesFetchingError,
  } = useQuery<Trade[]>({
    queryKey: [queryKeys.binanceData, symbol],
    queryFn: () => getTradesForSymbol(symbol),
    refetchInterval: ApiConstants.REFETCH_INTERVAL,
  });

  return { trades, isTradesFetching, isTradesFetchingError };
}
