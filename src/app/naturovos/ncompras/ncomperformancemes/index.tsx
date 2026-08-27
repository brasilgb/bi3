import AlertData from '@/components/AlertData';
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NComPerformanceMes = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nComPerfMes, setNComPerfMes] = useState<any>([]);
  const [nComTotais, setNComTotais] = useState<any>([]);
  const [loadingPerfMes, setLoadingPerfMes] = useState(true);
  const [loadingTotais, setLoadingTotais] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos serviço resumo dia
  useEffect(() => {
    async function getLComPerfMes() {
      await birel
        .post('(NAT_COM_COMPRAFMES)', {
          datanatcomprafmes: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi016.bidata;
          setNComPerfMes(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingPerfMes(false));
    }
    getLComPerfMes();
  }, [dataFiltro, reloadTrigger]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComTotais() {
      await birel
        .post('(NAT_COM_COMPRATOTA)', {
          datanatcompratota: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi020.bidata;
          setNComTotais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingTotais(false));
    }
    getLComTotais();
  }, [dataFiltro, reloadTrigger]);

  const isLoading = loadingPerfMes || loadingTotais;
  const handleRetry = () => {
    setHasError(false);
    setLoadingPerfMes(true);
    setLoadingTotais(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <>
      {isLoading
        ? <LoadingRows />
        : hasError
        ? <ErrorRetry onRetry={handleRetry} />
        : nComPerfMes.length > 0
        ? <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-800">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Mes/Ano</BTh>
                <BTh classname="w-16">Média Compras</BTh>
                <BTh classname="w-16">Rep. Total</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(nComTotais[0]?.MesMedia)}</BTd>
                <BTd>{(nComTotais[0]?.MesRepTotal * 100).toFixed(2)}%</BTd>
              </BTr>
              {nComPerfMes
                .sort((a: any, b: any) =>
                  parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1
                )
                .map((mes: any, idx: number) => (
                  <BTr
                    key={idx}
                    classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 transition-colors duration-150 hover:bg-solar-orange-prymary/10`}
                  >
                    <BTd>{mes.MesAno}</BTd>
                    <BTd>{formatMoney(mes?.Media)}</BTd>
                    <BTd>{(mes?.RepTotal * 100).toFixed(2)}%</BTd>
                  </BTr>
                ))}
            </tbody>
          </BTable>
        </div>
        : <AlertData />
      }
    </>

  );
};

export default NComPerformanceMes;
