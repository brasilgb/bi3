import { BTable, BTd, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import { formatMoney } from "@/utils";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { IoChevronDown, IoChevronUp, IoRemove } from "react-icons/io5";

type Props = {}

const FluxoGrupo = (props: Props) => {
  const { dataInicial, dataFinal } = useAuthContext();
  const [fluxoDataParcialLojas, setFluxoDataParcialLojas] = useState<any>([]);
  const [levelOpen, setLevelOpen] = useState<boolean>(false);
  const [levelOpen2, setLevelOpen2] = useState<boolean>(false);
  const [levelNum, setLevelNum] = useState<number>(0);
  const [levelNum2, setLevelNum2] = useState<number>(0);

  const handleLevelOpen = (num: number) => {
    if (levelNum === num && levelOpen) {
      setLevelNum(num)
      setLevelOpen(false)
    } else {
      setLevelNum(num)
      setLevelOpen(true)
    }
  }

  const handleLevelOpen2 = (num: number) => {
    if (levelNum2 === num && levelOpen2) {
      setLevelNum2(num)
      setLevelOpen2(false)
    } else {
      setLevelNum2(num)
      setLevelOpen2(true)
    }
  }

  useEffect(() => {
    async function getFluxoCaixaLojas() {
      await birel
        .post('(FLUXO_DE_CAIXA)', {
          fluxoTipreg: 1,
          fluxoDepto: 99,
          fluxoDatini: moment(dataInicial).format('YYYYMMDD'),
          fluxoDatfin: moment(dataFinal).format('YYYYMMDD'),
        })
        .then(results => {
          setFluxoDataParcialLojas(results.data.bi054.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getFluxoCaixaLojas();
  }, [dataInicial, dataFinal]);

  const caretLevel = (nivel: number, codigo: number) => {
    return fluxoDataParcialLojas.filter((lv: any) => lv.nivel === nivel && codigo === lv.agrupador).length;
  }

  return (
    <div className="w-full bg-solar-blue-dark text-white rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <div className="font-medium text-left px-2 py-0.5 whitespace-nowrap">Fluxo de caixa lojas</div>
      <BTable>
        {fluxoDataParcialLojas
          .filter((n1: any) => (n1.nivel === 1))
          .sort((a: any, b: any) => (a.ordem > b.ordem ? 1 : -1))
          .map((fluxo1: any, idx: number) => (
            <>
              <BTr onclick={() => handleLevelOpen(fluxo1.codigo)} key={idx} classname={`flex justify-between text-sm !border-b-gray-100 text-gray-500 bg-gray-200 hover:bg-red-50 ${caretLevel(2, fluxo1.codigo) ? "cursor-pointer" : "cursor-default"}`}>
                <BTd classname="flex items-center">
                  {caretLevel(2, fluxo1.codigo)
                    ? <span className={`text-gray-500 duration-300 ${levelOpen && levelNum === fluxo1.codigo ? '-rotate-180' : 'rotate-0'}`}><IoChevronDown size={18} /></span>
                    : <span className="text-gray-400"><IoRemove size={18} /></span>
                  }
                  <span className="text-sm text-gray-500">{fluxo1.descricao}</span></BTd>
                <BTd classname={`font-bold ${fluxo1.valor > 0 ? "text-blue-600" : "text-red-500"}`}>{formatMoney(fluxo1.valor)}</BTd>
              </BTr>
              {levelOpen && levelNum === fluxo1.codigo &&
                <BTr>
                  <BTd colspan={2} classname="!p-0">
                    {fluxoDataParcialLojas
                      .filter((n2: any) => (n2.nivel === 2 && fluxo1.codigo === n2.agrupador && n2.valor !== 0))
                      .map((fluxo2: any, idx: number) => (
                        <>
                          <BTr onclick={() => handleLevelOpen2(fluxo2.codigo)} key={idx} classname={`flex justify-between !border-b-gray-50 bg-gray-100 text-gray-500 hover:bg-red-50 ${caretLevel(2, fluxo1.codigo) ? "cursor-pointer" : "cursor-default"}`}>
                            <BTd classname="flex items-center">
                              {caretLevel(3, fluxo2.codigo)
                                ? <span className={`ml-2 text-gray-500 duration-300 ${levelOpen2 && levelNum2 === fluxo2.codigo ? '-rotate-180' : 'rotate-0'}`}><IoChevronDown size={18} /></span>
                                : <span className="ml-2 text-gray-400"><IoRemove size={14} /></span>
                              }
                              <span className="text-gray-500">{fluxo2.descricao}</span></BTd>
                            <BTd classname={`font-bold text-sm ${fluxo2.valor > 0 ? "text-blue-500" : "text-red-500"}`}>{formatMoney(fluxo2.valor)}</BTd>
                          </BTr>
                          {levelOpen2 && levelNum2 === fluxo2.codigo &&
                            <BTr classname="!p-0 flex flex-col">
                              <BTd colspan={2} classname="!p-0">
                                {fluxoDataParcialLojas
                                  .filter((n3: any) => (n3.nivel === 3 && fluxo2.codigo === n3.agrupador))
                                  .map((fluxo3: any, idx: number) => (
                                    <BTr key={idx} classname={`flex justify-between bg-gray-50 text-gray-500 hover:bg-red-50`}>
                                      <BTd classname="flex items-center">
                                        <span className="ml-4 text-gray-400"><IoRemove size={14} /></span>
                                        <span className="pl-1">{fluxo3.descricao}</span></BTd>
                                      <BTd classname={`font-bold text-sm ${fluxo3.valor > 0 ? "text-sky-600" : "text-red-500"}`}>{formatMoney(fluxo3.valor)}</BTd>
                                    </BTr>
                                  ))}
                              </BTd>
                            </BTr>
                          }
                        </>
                      ))}
                  </BTd>
                </BTr>
              }
            </>
          ))}
      </BTable>
    </div>
  )
}

export default FluxoGrupo