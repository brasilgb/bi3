import AlertData from '@/components/AlertData';
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SComPerformanceMes = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lComTotais, setLComTotais] = useState<any>([]);
  const [lComPerfMes, setLComPerfMes] = useState<any>([]);
  const [loadingPerfMes, setLoadingPerfMes] = useState(true);
  const [loadingTotais, setLoadingTotais] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos serviço resumo dia
  useEffect(() => {
    async function getLComPerfMes() {
      await birel
        .post('(LOJ_COM_PERFMES)', {
          datalojperfmes: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi004.bidata;
          setLComPerfMes(typeof res === "undefined" ? [] : res);
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
        .post('(LOJ_COM_TOTAL)', {
          datalojtotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi005.bidata;
          setLComTotais(typeof res === "undefined" ? [] : res);
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
        : lComPerfMes.length > 0
        ? <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-50">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Mes/Ano</BTh>
                <BTh classname="w-16">Média Compras</BTh>
                <BTh classname="w-16">Rep.</BTh>
                <BTh classname="w-16">Prazo médio</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(lComTotais[0]?.MediaCompraMes)}</BTd>
                <BTd>{(lComTotais[0]?.RepMes * 100).toFixed(2)}%</BTd>
                <BTd>{lComTotais[0]?.PrazoMedioMes}</BTd>
              </BTr>
              {lComPerfMes
                .sort((a: any, b: any) =>
                  parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1
                )
                .map((mes: any, idx: number) => (
                  <BTr
                    key={idx}
                    classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 transition-colors duration-150 hover:bg-solar-blue-primary/10`}
                  >
                    <BTd>{mes.MesAno}</BTd>
                    <BTd>{formatMoney(mes?.MediaCompra)}</BTd>
                    <BTd>{(mes?.Rep * 100).toFixed(2)}%</BTd>
                    <BTd>{mes?.PrazoMedio}</BTd>
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

export default SComPerformanceMes;
