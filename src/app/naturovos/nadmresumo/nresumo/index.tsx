import { BTable, BTd, BTh, BTr } from "@/components/Table"
import { useAuthContext } from "@/contexts/AuthContext"
import birel from "@/services/birel"
import { formatMoney } from "@/utils"
import moment from "moment"
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from "react-icons/io5"
import NResAssociacao from "./nresassociacao"

const NResumo = () => {
  const { dataFiltro } = useAuthContext();
  const [nResumoGrupo, setNResumoGrupo] = useState<any>([]);
  const [nResumoTotais, setNResumoTotais] = useState<any>([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNResumoGrupo() {
      await birel
        .post('(NAT_RES_GRUPO)', {
          datanatresgrupo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNResumoGrupo(results.data.bi032.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNResumoGrupo();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNResumoTotais() {
      await birel
        .post('(NAT_RES_TOTAIS)', {
          datanatrestotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNResumoTotais(results.data.bi033.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNResumoTotais();
  }, [dataFiltro]);

  const handleAccordionClick = (index: any) => {
    if (index !== openAccordion) {
      setOpenAccordion(index);
    } else {
      setOpenAccordion(null);
    }
  };

  return (
    <div className="w-full rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="bg-solar-orange-prymary">
            <BTh classname="w-0"><></></BTh>
            <BTh classname="w-16"><>Grupo Pai</></BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotValorMesAtual}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepValorMesAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepValorAnoAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotQtdMesAtual}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdMesAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdMesAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdAnoAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotRepPrecMedioMesAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotPrecMedioAnoAnterior}</BTh>
            <BTh classname="w-16">{nResumoTotais[0]?.RotMargemAtual}</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd><></></BTd>
            <BTd>Total</BTd>
            <BTd>{formatMoney(nResumoTotais[0]?.ValorMesAtual)}</BTd>
            <BTd>{(nResumoTotais[0]?.ValRepValorMesAnterior * 100).toFixed(2)}%</BTd>
            <BTd>{(nResumoTotais[0]?.ValRepValorAnoAnterior * 100).toFixed(2)}%</BTd>
            <BTd>{nResumoTotais[0]?.ValQtdMesAtual.toFixed()}</BTd>
            <BTd>{(nResumoTotais[0]?.ValRepQtdMesAnterior * 100).toFixed(2)}%</BTd>
            <BTd>{(nResumoTotais[0]?.ValRepQtdAnoAnterior * 100).toFixed(2)}%</BTd>
            <BTd>-</BTd>
            <BTd>-</BTd>
            <BTd>-</BTd>
            <BTd>{(nResumoTotais[0]?.ValMargemAtual * 100).toFixed(2)}%</BTd>
          </BTr>
          {nResumoGrupo
            .sort((a: any, b: any) =>
              parseInt(a.ValorMesAtual) < parseInt(b.ValorMesAtual) ? 1 : -1
            )
            .map((grupo: any, idx: any) => (
              <>
                <BTr
                  key={idx}
                  onclick={() => handleAccordionClick(idx)}
                  classname={`${openAccordion === idx ? 'bg-gray-300 active:bg-gray-300 hover:bg-gray-300' : idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50 '} text-gray-500 active:bg-gray-300 hover:bg-red-50 cursor-pointer`}
                >
                  <BTd classname="flex justify-start">
                    <IoChevronDown size={20} color={openAccordion === idx ? '#2168eb' : '#bebbbb'} className={`duration-300 ${openAccordion === idx ? '-rotate-180' : 'rotate-0'}`} />
                  </BTd>
                  <BTd>{grupo.Grupo}</BTd>
                  <BTd>{formatMoney(grupo?.ValorMesAtual)}</BTd>
                  <BTd>{(grupo?.RepValorMesAnterior * 100).toFixed(2)}%</BTd>
                  <BTd>{isNaN(grupo?.RepValorAnoAnterior) ? 0 : (grupo?.RepValorAnoAnterior * 100).toFixed(2)}%</BTd>
                  <BTd>{grupo?.QtdMesAtual.toFixed()}</BTd>
                  <BTd>{(grupo?.RepQtdMesAnterior * 100).toFixed(2)}%</BTd>
                  <BTd>{(grupo?.RepQtdAnoAnterior * 100).toFixed(2)}%</BTd>
                  <BTd>{formatMoney(grupo?.PrecMedioMesAtual)}</BTd>
                  <BTd>{formatMoney(grupo?.RepPrecMedioMesAnterior)}</BTd>
                  <BTd>{formatMoney(grupo?.RepPrecMedioAnoAnterior)}</BTd>
                  <BTd>{(grupo?.RepMargemAtual * 100).toFixed(2)}%</BTd>
                </BTr>
                <BTr classname="">
                  <BTd colspan={14} classname={`!px-0 ${openAccordion === idx ? "" : "hidden"}`}>
                    <NResAssociacao grupo={grupo.Grupo} />
                  </BTd>
                </BTr>
              </>
            ))}
        </tbody>
      </BTable>
    </div>
  )
}

export default NResumo