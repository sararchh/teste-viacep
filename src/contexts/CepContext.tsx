"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ICep } from "@/types/cep";
import { ReactNode, createContext, useContext } from "react";

interface CepData {
  [key: string]: ICep;
}

interface CepContextData {
  getAllCepLocalStorage: () => CepData;
  getCepLocalStorage: (cep: string) => ICep | null;
  setCepLocalStorage: (cep: string, data: ICep) => void;
}

interface CepProviderProps {
  children: ReactNode;
}

export const CepContext = createContext({} as CepContextData);

export function CepProvider({ children }: CepProviderProps) {
  const [storedCepData, setStoredCepData] = useLocalStorage<CepData>("@cepData", {});

  const getAllCepLocalStorage = (): CepData => {
    return storedCepData;
  };

  const getCepLocalStorage = (cep: string): ICep | null => {
    return storedCepData[`cep-${cep}`] || null;
  };

  const setCepLocalStorage = (cep: string, data: ICep): void => {
    //@ts-ignore
    setStoredCepData((prevData) => ({
      ...prevData,
      [`cep-${cep}`]: data,
    }));
  };

  return (
    <CepContext.Provider value={{ getAllCepLocalStorage, getCepLocalStorage, setCepLocalStorage }}>
      {children}
    </CepContext.Provider>
  );
}

export const useCep = () => useContext(CepContext);