import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ParsedCurl } from "@/libs/utls/parse-curl";

const useExcuteCrulProvider = () => {
  return useMutation({
    mutationFn: async (parsedCurl: ParsedCurl) => {
      const response = await axios({
        url: parsedCurl.url,
        method: "POST",
        headers: parsedCurl.headers,
        data: parsedCurl.data,
      });
      return response.data;
    },
  });
};

export default useExcuteCrulProvider;
