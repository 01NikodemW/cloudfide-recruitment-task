import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    console.error("API Error:", error);
    const message = error.response.data.message;
    if (Array.isArray(message)) {
      message.forEach((msg) => {
        toast.error(msg);
      });
    } else {
      toast.error(message);
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
});
