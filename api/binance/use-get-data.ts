import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { axiosInstance } from "@/api/axios-instance";


const getData = async () => {
  const url = "/api/v3/trades";

  const params = {
    symbol: "BTCUSDT",
    limit: 10,
  };

  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetData() {
  const { data: binanceData = [], isFetching: isBinanceDataFetching } =
    useQuery<any[]>({
      queryKey: [queryKeys.binanceData],
      queryFn: () => getData(),
      refetchInterval: 5000,
    });

  return { binanceData, isBinanceDataFetching };
}
