import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { axiosInstance } from "@/api/axios-instance";

const getData = async (symbol: string) => {
  const url = "/api/v3/trades";

  const params = {
    symbol: symbol,
    limit: 10,
  };

  try {
    const response = await axiosInstance.get(url, { params });
    const aggregatedData = response.data.reduce(
      (acc: Record<number, { volume: number; price: number }>, trade: any) => {
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

    const mergedData = Object.entries(aggregatedData).map(
      ([time, { volume, price }]) => ({
        time: Number(time),
        volume,
        price,
      })
    );

    return mergedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetData(symbol: string) {
  const { data: binanceData = [], isFetching: isBinanceDataFetching } =
    useQuery<any[]>({
      queryKey: [queryKeys.binanceData, symbol],
      queryFn: () => getData(symbol),
      refetchInterval: 5000,
    });

  return { binanceData, isBinanceDataFetching };
}
