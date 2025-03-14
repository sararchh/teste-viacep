"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ButtonComponent } from "@/components/atoms/Button/Button";
import { InputComponent } from "@/components/atoms/Input/Input";
import { HeaderComponent } from "@/components/molecules/Header/Header";
import { useGetCep } from "@/repository/useGetCep";
import { formatCep } from "@/utils/format-cep";

import { useCep } from "@/contexts/CepContext";
import { ICep } from "@/types/cep";
import { IfRender } from "@/utils/jsx";

import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Spinner } from "@/components/atoms/Spinner/Spinner";

const QueryCEP: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cep, setCep] = React.useState("");
  const [isFetchEnabled, setIsFetchEnabled] = React.useState(false);
  const [localData, setLocalData] = React.useState<ICep | null>(null);

  const { data, isLoading } = useGetCep(cep, isFetchEnabled);
  const { getCepLocalStorage, setCepLocalStorage } = useCep();

  React.useEffect(() => {
    const cepFromUrl = searchParams.get("cep");
    if (cepFromUrl) {
      setCep(formatCep(cepFromUrl));
      handleGetCep(cepFromUrl);
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      setLocalData(data);
    }

    setIsFetchEnabled(false);
  }, [data, isFetchEnabled]);

  const handleGetCep = (cepValue?: string) => {
    const cepToFetch = cepValue || cep;
    if (cepToFetch.replace(/\D/g, "").length === 8) {
      const storedData = getCepLocalStorage(cepToFetch);
      if (storedData) {
        setLocalData(storedData);
      } else {
        setIsFetchEnabled(true);
      }
      router.push(`/consulta?cep=${cepToFetch}`);
    } else {
      toast.error("CEP inválido, verifique!");
      setIsFetchEnabled(false);
    }
  };

  const handleChangeCep = (value: string) => {
    setLocalData(null);
    setCep(formatCep(value));
  };

  const handleSaveCep = () => {
    if (localData) {
      setCepLocalStorage(localData.cep, localData);
      toast.success("CEP salvo com sucesso!");
    }
  };

  const renderData = (label: string, value: string) => (
    <p className="text-1xl leading-8">
      <strong>{label}:</strong> {value || "Não informado"}
    </p>
  );

  return (
    <>
      <HeaderComponent />

      <div className="container mx-auto p-4">
        <section>
          <span className="flex items-center gap-3">
            <Link href="/">
              <FaArrowLeft />
            </Link>
            <h2 className="font-semibold">Consulta de CEP</h2>
          </span>
          <p className="text-1xl opacity-55">Informe o CEP para consulta:</p>
          <br />
          <div className="flex flex-col lg:flex-row lg:items-baseline lg:space-x-4">
            <InputComponent
              className="sm:w-full lg:w-[400px]"
              classInput="outline-none border-1 border--color-gray-20 rounded-lg p-2"
              name="cep"
              placeholder="Informe o CEP"
              value={cep}
              onChange={handleChangeCep}
            />
            <ButtonComponent
              onClick={() => handleGetCep()}
              className="lg:mt-0 min-w-2xs lg:w-14 sm:w-full rounded-2xl h-10 bg-[var(--color-orange-10)] font-bold cursor-pointer"
            >
              Consultar
            </ButtonComponent>
          </div>
        </section>

        <IfRender condition={localData}>
          <section className="mt-10 shadow-md p-6 rounded-lg bg-[var(--color-white)] flex items-center flex-col">
            {localData?.erro && <p>Erro ao buscar CEP, verifique!</p>}
            {isLoading && <Spinner classSize={"w-[20px] h-[20px]"} />}
            {localData && !localData.erro && (
              <div className="flex flex-wrap gap-4">
                {renderData("Logradouro", localData.logradouro)}
                {renderData("Bairro", localData.bairro)}
                {renderData("Localidade", localData.localidade)}
                {renderData("UF", localData.uf)}
                {renderData("CEP", localData.cep)}
                {renderData("Complemento", localData.complemento)}
                {renderData("DDD", localData.ddd)}
                {renderData("Estado", localData.estado)}
                {renderData("GIA", localData.gia)}
                {renderData("IBGE", localData.ibge)}
                {renderData("Região", localData.regiao)}
                {renderData("SIAFI", localData.siafi)}
                {renderData("Unidade", localData.unidade)}
              </div>
            )}
            <IfRender condition={localData?.cep}>
              <ButtonComponent
                onClick={handleSaveCep}
                className="mt-4 lg:mt-0 min-w-2xs lg:w-14 sm:w-full rounded-2xl h-10 bg-[var(--color-orange-10)] font-bold cursor-pointer"
              >
                Salvar CEP
              </ButtonComponent>
            </IfRender>
          </section>
        </IfRender>
      </div>
    </>
  );
};

const QueryCEPSuspenseWrapper: React.FC = () => (
  <Suspense
    fallback={
      <div>
        <Spinner classSize={"w-[20px] h-[20px]"} />
      </div>
    }
  >
    <QueryCEP />
  </Suspense>
);

export default QueryCEPSuspenseWrapper;
