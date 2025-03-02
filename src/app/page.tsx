"use client";
import { ButtonComponent } from "@/components/atoms/Button/Button";
import { HeaderComponent } from "@/components/molecules/Header/Header";
import TableComponent from "@/components/molecules/Table/Table";
import { useCep } from "@/contexts/CepContext";
import { ICep } from "@/types/cep";
import { IfRender } from "@/utils/jsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const { getAllCepLocalStorage } = useCep();
  const [formattedData, setFormattedData] = useState<ICep[]>([]);

  const columns = [
    "bairro",
    "cep",
    "complemento",
    "ddd",
    "estado",
    "gia",
    "ibge",
    "localidade",
    "logradouro",
    "regiao",
    "siafi",
    "uf",
    "unidade",
  ];

  useEffect(() => {
    const data = Object.entries(getAllCepLocalStorage()).map(
      ([key, value]) => ({
        key,
        ...value,
      })
    );
    setFormattedData(data);
  }, []);

  const handleNewCepClick = () => {
    router.push("/consulta");
  };

  return (
    <main className="w-full h-full">
      <HeaderComponent />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="font-semibold text-2xl">Listagem de CEPs</h2>
          <ButtonComponent
            className="rounded-2xl w-26 h-10 bg-[var(--color-orange-10)] font-bold cursor-pointer"
            onClick={handleNewCepClick}
          >
            Novo CEP
          </ButtonComponent>
        </div>
        <IfRender condition={formattedData.length === 0}>
          <p>Nenhum CEP cadastrado!</p>
        </IfRender>

        <IfRender condition={formattedData.length > 0}>
          <TableComponent columns={columns} data={formattedData} />
        </IfRender>
      </div>
    </main>
  );
}
