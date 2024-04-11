import { BTable, BTd, BTh, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import { formatMoney, removeAcentos } from "@/utils";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { IoChevronDown, IoChevronUp, IoRemove } from "react-icons/io5";

type Props = {}

const FluxoSolarData = (props: Props) => {
  const { dataInicial, dataFinal } = useAuthContext();
  const [fluxoDataParcialLojas, setFluxoDataParcialLojas] = useState<any>([]);
  const [levelOpen, setLevelOpen] = useState<boolean>(false);
  const [levelOpen2, setLevelOpen2] = useState<boolean>(false);
  const [levelValue, setLeveValue] = useState<string>('');
  const [levelValue2, setLeveValue2] = useState<string>('');

  const handleLevelOpen = (value: string) => {
    if (levelValue === value && levelOpen) {
      setLeveValue(value)
      setLevelOpen(false)
    } else {
      setLeveValue(value)
      setLevelOpen(true)
    }
  }

  const handleLevelOpen2 = (value: string) => {
    if (levelValue2 === value && levelOpen2) {
      setLeveValue2(value)
      setLevelOpen2(false)
    } else {
      setLeveValue2(value)
      setLevelOpen2(true)
    }
  }

  useEffect(() => {
    async function getFluxoCaixaLojas() {
      await birel
        .post('(FLUXO_DE_CAIXA_DATA)', {
          fluxoTipreg: 1,
          fluxoDepto: 1,
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
  const descricao1 = fluxoDataParcialLojas.filter((ds: any) => ds.nivel === 1 && ds.coluna === 1);
  const descricao2 = fluxoDataParcialLojas.filter((ds: any) => ds.nivel === 2 && ds.coluna === 1 && removeAcentos(ds.agrupadorNome) === levelValue);
  const descricao3 = fluxoDataParcialLojas.filter((ds: any) => ds.nivel === 3 && ds.coluna === 1 && removeAcentos(ds.agrupadorNome) === levelValue2);

  const uniqueDescricao1 = Array.from(
    new Set(descricao1.map((item: any) => item.descricao))
  );
  const uniqueDescricao2 = Array.from(
    new Set(descricao2.map((item: any) => item.descricao))
  );
  const uniqueDescricao3 = Array.from(
    new Set(descricao3.map((item: any) => item.descricao))
  );
  // .filter((v:any) => v.valor > 0)
  const dataNivel1 = fluxoDataParcialLojas.filter(
    (ds: any) => ds.nivel === 1 && ds.coluna > 1
  );
  const dataNivel2 = fluxoDataParcialLojas.filter(
    (ds: any) =>
      ds.nivel === 2 &&
      removeAcentos(ds.agrupadorNome) === levelValue &&
      ds.coluna > 1
  );
  const dataNivel3 = fluxoDataParcialLojas.filter(
    (ds: any) =>
      ds.nivel === 3 &&
      removeAcentos(ds.agrupadorNome) === levelValue2 &&
      ds.coluna > 1
  );

  const caretLevel = (nivel: number, codigo: any) => {
    return fluxoDataParcialLojas.filter((lv: any) => lv.nivel === nivel && codigo == removeAcentos(lv.agrupadorNome)).length;
  }
  const uniqueData = Array.from(
    new Set(fluxoDataParcialLojas.filter((f: any) => f.nivel === 1 && f.data != null).map((item: any) => (item.data)))
  );

  return (
    <div className="w-full bg-solar-blue-dark text-white rounded-t-md shadow-sm overflow-x-auto animate__animated animate__fadeIn">
      <div className="font-medium text-left px-2 py-0.5 whitespace-nowrap">Fluxo de caixa lojas</div>
      <BTable>
        <BTr classname="flex justify-start text-base bg-solar-green text-gray-100">
          <BTd classname="flex items-start">
            <div className="w-[206px] ml-1 pl-4 uppercase">Descrição</div>
          </BTd>
          {uniqueData.map((dt: any, idx: number) => (
            <BTd key={idx} classname="flex justify-start">
              <div className="w-28 text-left">{dt}</div>
            </BTd>
          ))}
        </BTr>
        {uniqueDescricao1.map((fluxo1: any, idx: number) => (
          <>
            <BTr onclick={() => handleLevelOpen(removeAcentos(fluxo1))} key={idx} classname={`flex justify-start text-sm !border-b-gray-100 text-gray-500 bg-gray-200 hover:bg-red-50 ${caretLevel(2, removeAcentos(fluxo1)) ? "cursor-pointer" : "cursor-default"}`}>
              <BTd classname="flex items-center">
                {caretLevel(2, removeAcentos(fluxo1))
                  ? <span className={`text-gray-500 duration-300 ${levelOpen && levelValue === removeAcentos(fluxo1) ? '-rotate-180' : 'rotate-0'}`}><IoChevronDown size={18} /></span>
                  : <span className="text-gray-400"><IoRemove size={18} /></span>
                }
                <span className="text-sm text-gray-500 w-48">{fluxo1}</span></BTd>
              {dataNivel1.filter((n1: any) => removeAcentos(n1.descricao) === removeAcentos(fluxo1)).map((v1: any) => (
                <BTd classname={`font-bold ${v1.valor > 0 ? "text-blue-600" : "text-red-500"}`}>
                  <div className="w-28">
                    {formatMoney(v1.valor)}
                  </div>
                </BTd>
              ))}
            </BTr>
            {levelOpen && levelValue === removeAcentos(fluxo1) &&
              <BTr>
                <BTd colspan={2} classname="!p-0">
                  {uniqueDescricao2.map((fluxo2: any, idx: number) => (
                    <>
                      <BTr onclick={() => handleLevelOpen2(removeAcentos(fluxo2))} key={idx} classname={`flex justify-start !border-b-gray-50 bg-gray-100 text-gray-500 hover:bg-red-50 ${caretLevel(3, removeAcentos(fluxo2)) ? "cursor-pointer" : "cursor-default"}`}>
                        <BTd classname="flex items-center">
                          {caretLevel(3, removeAcentos(fluxo2))
                            ? <span className={`ml-2 text-gray-500 duration-300 ${levelOpen2 && levelValue2 === removeAcentos(fluxo2) ? '-rotate-180' : 'rotate-0'}`}><IoChevronDown size={18} /></span>
                            : <span className="ml-3 text-gray-400"><IoRemove size={14} /></span>
                          }
                          <span className="text-gray-500 w-[184px]">{fluxo2}</span></BTd>
                        {dataNivel2.filter((n2: any) => removeAcentos(n2.descricao) === removeAcentos(fluxo2)).map((v2: any) => (
                          <BTd classname={`font-bold ${v2.valor > 0 ? "text-blue-500" : "text-red-500"}`}>
                            <div className="w-28 text-sm">
                              {formatMoney(v2.valor)}
                            </div>
                          </BTd>
                        ))}
                      </BTr>
                      {levelOpen2 && levelValue2 === removeAcentos(fluxo2) &&
                        <BTr classname="!p-0 flex flex-col">
                          <BTd colspan={2} classname="!p-0">
                            {uniqueDescricao3.map((fluxo3: any, idx: number) => (
                              <BTr key={idx} classname={`flex justify-start bg-gray-50 text-gray-500 hover:bg-red-50`}>
                                <BTd classname="flex items-center">
                                  <span className="ml-4 text-gray-400"><IoRemove size={14} /></span>
                                  <span className="pl-1 w-[181px]">{fluxo3}</span></BTd>
                                {dataNivel3.filter((n3: any) => removeAcentos(n3.descricao) === removeAcentos(fluxo3)).map((v3: any) => (
                                  <BTd classname={`font-bold ${v3.valor > 0 ? "text-sky-600" : "text-red-500"}`}>
                                    <div className="w-28 text-sm">
                                      {formatMoney(v3.valor)}
                                    </div>
                                  </BTd>
                                ))}
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

export default FluxoSolarData