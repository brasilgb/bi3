'use client';
import LFatCombination from '@/components/Charts/LFatCombination';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SPerformance = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lGraficoLojas, setLGraficoLojas] = useState<any>([]);
  const [lFatuTotLojas, setLFatuTotLojas] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLGraficoLojas() {
      await birel.post('(LOJ_FAT_GRAFEVO)', {
          datalojgrafevo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          
          
          // const sortGraf = results.data.bi008.bidata.sort((a: any, b: any) =>
          //   a.DiaSemana < b.DiaSemana ? 1 : -1
          // );
          // setLGraficoLojas(sortGraf);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLGraficoLojas();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_FATUTO)', {
          datalojfatuto: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFatuTotLojas(results.data.bi007.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);
  // console.log(lGraficoLojas);

  return (
    <>
      <div className="w-full shadow-sm overflow-x-auto animate__animated animate__fadeIn">
        <div className="bg-solar-blue-primary text-sm text-solar-green-prymary font-medium p-2 uppercase border-b border-b-slate-500 rounded-t-md">
          Performance Mês
        </div>
        <div className="overflow-x-auto">
          <BTable classname="text-gray-50 bg-solar-blue-primary rounded-b-lg">
            <thead>
              <BTr classname="">
                <BTh classname="w-36">Meta</BTh>
                <BTh classname="w-36">Venda</BTh>
                <BTh classname="w-36">Falta vender</BTh>
                <BTh classname="w-24">Meta</BTh>
                <BTh classname="w-24">Atingido</BTh>
                <BTh classname="w-24">Perf.</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd classname="py-4">
                  {formatMoney(lFatuTotLojas[0]?.MetaMes)}
                </BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.VendaMes)}</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FaltaVenderMes)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.MetaParcMes * 100).toFixed(2)}%</BTd>
                <BTd>{(lFatuTotLojas[0]?.AtingidoMes * 100).toFixed(2)}%</BTd>
                <BTd>{(lFatuTotLojas[0]?.PerfAtualMes * 100).toFixed(2)}%</BTd>
              </BTr>
            </tbody>
          </BTable>
        </div>

      </div>
      <div className="mt-4 w-full shadow-sm animate__animated animate__fadeIn">
        <div className="bg-solar-blue-primary text-sm text-solar-green-prymary font-medium p-2 uppercase border-b border-b-slate-500 rounded-t-md">
          Performance Dia
        </div>
        <div className="overflow-x-auto">
          <BTable classname="text-gray-50 bg-solar-blue-primary rounded-b-lg ">
            <thead>
              <BTr classname="">
                <BTh classname="w-36">Meta</BTh>
                <BTh classname="w-36">Venda</BTh>
                <BTh classname="w-36">Falta vender</BTh>
                <BTh classname="w-24">Meta</BTh>
                <BTh classname="w-24">Juros</BTh>
                <BTh classname="w-24">Juros%</BTh>
                <BTh classname="w-24">Média</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd classname="py-4">
                  {formatMoney(lFatuTotLojas[0]?.MetaDia)}
                </BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.VendaDia)}</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FaltaVenderDia)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.PerfMetaDia * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.JurSParcDia)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.PerfJurDia * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.MediaDia)}</BTd>
              </BTr>
            </tbody>
          </BTable>
        </div>

      </div>
      <div className="bg-white my-4 rounded-md p-2 relative mt-4">
        <LFatCombination data={lGraficoLojas} />
      </div>
    </>
  );
};

export default SPerformance;
