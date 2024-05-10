'use client';
import LFatCombination from '@/components/Charts/LFatCombination';
import NFatPerfCombination from "@/components/Charts/NFatPerfCombination";
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NPerformance = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nGraficoPerf, setNGraficoPerf] = useState<any>([]);
  const [nFatuTot, setNFatuTot] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLGraficoLojas() {
      await birel
        .post('(NAT_FAT_GRAFICO)', {
          datanatgrafico: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNGraficoPerf(results.data.bi021.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLGraficoLojas();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNFatuTot() {
      await birel
        .post('(NAT_FAT_TOTAIS)', {
          datanattotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNFatuTot(results.data.bi029.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNFatuTot();
  }, [dataFiltro]);

  return (
    <>
      <div className="mt-4 w-full rounded-md shadow-sm overflow-x-auto animate__animated animate__fadeIn">
        <div className="bg-solar-orange-prymary text-sm text-gray-800 font-medium p-2 uppercase">
          Média Dia
        </div>
        <BTable classname="text-gray-700 bg-solar-orange-prymary rounded-b-lg">
          <tbody>
            <BTr classname="bg-blue-50 text-gray-600 font-bold">
              <BTd classname="py-4">
                {formatMoney(nFatuTot[0]?.MediaDia)}
              </BTd>
            </BTr>
          </tbody>
        </BTable>
      </div>
      <div className="bg-white my-4 rounded-md p-2 relative mt-4">
        <NFatPerfCombination data={nGraficoPerf} />
      </div>
    </>
  );
};

export default NPerformance;
