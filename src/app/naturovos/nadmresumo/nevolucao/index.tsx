import AlertData from "@/components/AlertData";
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';
import NAdmEvolucao from "@/components/Charts/NAdmEvolucao";
import { BTable, BTd, BTh, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import { formatMoney } from "@/utils";
import moment from "moment";
import React, { useEffect, useState } from 'react'

const NEvolucao = (grupo: any) => {
  const { dataFiltro } = useAuthContext();
  const [nResumoGrafico, setNResumoGrafico] = useState([]);
  const [nResumoTotais, setNResumoTotais] = useState<any>([]);
  const [loadingGrafico, setLoadingGrafico] = useState(true);
  const [loadingTotais, setLoadingTotais] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    async function getNResumoGrupo() {
      await birel
        .post('(NAT_RES_GRAFICO)', {
          datagrafico: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi031.bidata;
          setNResumoGrafico(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingGrafico(false));
    }
    getNResumoGrupo();
  }, [dataFiltro, reloadTrigger]);

  useEffect(() => {
    async function getNResumoTotais() {
      await birel
        .post('(NAT_RES_TOTAIS)', {
          datanatrestotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi033.bidata;
          setNResumoTotais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingTotais(false));
    }
    getNResumoTotais();
  }, [dataFiltro, reloadTrigger]);

  const isLoading = loadingGrafico || loadingTotais;
  const handleRetry = () => {
    setHasError(false);
    setLoadingGrafico(true);
    setLoadingTotais(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <>
      {isLoading
        ? <LoadingRows />
        : hasError
        ? <ErrorRetry onRetry={handleRetry} />
        : nResumoGrafico.length > 0
        ? <>
          <div className="mt-4 w-full rounded-md shadow-sm overflow-x-auto animate__animated animate__fadeIn">
            <BTable classname="text-gray-700 bg-solar-orange-prymary rounded-b-lg">
              <thead>
                <BTr>
                  <BTh classname="py-1">{nResumoTotais[0]?.TituloProjecao}</BTh>
                  <BTh classname="py-1">{nResumoTotais[0]?.TituloDif}</BTh>
                </BTr>
              </thead>
              <tbody>
                <BTr classname="bg-blue-50 text-gray-600 font-bold">
                  <BTd classname="py-4">
                    {formatMoney(nResumoTotais[0]?.ProjecaoFaturamento)}
                  </BTd>
                  <BTd classname="py-4">
                    {(nResumoTotais[0]?.DifMesAntAtual * 100).toFixed(2)}%
                  </BTd>
                </BTr>
              </tbody>
            </BTable>
          </div>
          <div className="bg-white my-4 rounded-md p-2 relative mt-4">
            <NAdmEvolucao data={nResumoGrafico} totais={nResumoTotais} />
          </div>
        </>
        : <AlertData />
      }
    </>
  )
}

export default NEvolucao