import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";

import { ICep } from "@/types/cep";

const getCep = async (payload: { cep: string }): Promise<ICep> => {
  if (payload.cep) {
    payload.cep = payload.cep.replace(/\D/g, "");
  }

  const { data } = await api.get(apiConfig.routes.ceps.listOne(payload.cep));

  return data;
};

export const useGetCep = (cep: string, isEnable: boolean) =>
  useQuery({
    queryKey: ["cep-list", cep],
    queryFn: () => getCep({ cep }),
    enabled: isEnable,
    retry: false,
  });
