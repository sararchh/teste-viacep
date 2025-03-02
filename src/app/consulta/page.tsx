"use client";
import React from "react";

import { ButtonComponent } from "@/components/atoms/Button/Button";
import { InputComponent } from "@/components/atoms/Input/Input";
import { HeaderComponent } from "@/components/molecules/header/header.component";
import { useGetCep } from "@/repository/useGetCep";
import { formatCep } from "@/utils/format-cep";

import toast from "react-hot-toast";

const QueryCEP: React.FC = () => {
  const [cep, setCep] = React.useState("");
  const [isFetchEnabled, setIsFetchEnabled] = React.useState(false);

  const { data, isLoading, isError } = useGetCep(cep, isFetchEnabled);

  const handleGetCep = () => {
    if (cep.replace(/\D/g, "").length === 8) {
      setIsFetchEnabled(true);
    } else {
      toast.error("CEP inválido, verifique!");
      setIsFetchEnabled(false);
    }
  };

  const handleChangeCep = (value: string) => {
    setCep(formatCep(value));
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
          <h2 className="font-semibold">Consulta de CEP</h2>
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
              onClick={handleGetCep}
              className="mt-4 lg:mt-0 min-w-2xs lg:w-14 sm:w-full rounded-2xl h-10 bg-[var(--color-orange-10)] font-bold cursor-pointer"
            >
              Consultar
            </ButtonComponent>
          </div>
        </section>

        <section className="mt-4">
          {isLoading && <p>Carregando...</p>}
          {isError && <p>Erro ao buscar CEP</p>}
          {data && (
             <div className="flex flex-wrap gap-4">
             {renderData("Logradouro", data.logradouro)}
             {renderData("Bairro", data.bairro)}
             {renderData("Localidade", data.localidade)}
             {renderData("UF", data.uf)}
             {renderData("CEP", data.cep)}
             {renderData("Complemento", data.complemento)}
             {renderData("DDD", data.ddd)}
             {renderData("Estado", data.estado)}
             {renderData("GIA", data.gia)}
             {renderData("IBGE", data.ibge)}
             {renderData("Região", data.regiao)}
             {renderData("SIAFI", data.siafi)}
             {renderData("Unidade", data.unidade)}
           </div>
          )}
        </section>
      </div>
    </>
  );
};

export default QueryCEP;