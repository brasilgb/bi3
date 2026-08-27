'use client';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import NAssociacao from "./nassociacao";
import NFiliais from "./nfiliais";
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";
import NExportacao from "./nexportacao";
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';

const NResumo = () => {
  const { dataFiltro } = useAuthContext();
  const [analise, setAnalise] = useState<string>('filiais');
  const [nFiliais, setNFiliais] = useState<any>([]);
  const [nAssociacao, setNAssociacao] = useState([]);
  const [nTotais, setNTotais] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  const [nExportacao, setNExportacao] = useState<any>([]);
  const [loadingFiliais, setLoadingFiliais] = useState(true);
  const [loadingAssociacao, setLoadingAssociacao] = useState(true);
  const [loadingTotais, setLoadingTotais] = useState(true);
  const [loadingExportacao, setLoadingExportacao] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNFiliais() {
      await birel
        .post('(NAT_FATURA_FILIAL)', {
          datanatfilial: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi035.bidata;
          setNFiliais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingFiliais(false));
    }
    getNFiliais();
  }, [dataFiltro, reloadTrigger]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNAssociacao() {
      await birel
        .post('(NAT_FATURA_GRUPO)', {
          datanatfatugrupo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi036.bidata;
          setNAssociacao(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingAssociacao(false));
    }
    getNAssociacao();
  }, [dataFiltro, reloadTrigger]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(NAT_FATURA_TOTAL)', {
          datanattotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi037.bidata;
          setNTotais(typeof res === "undefined" ? [] : res);
          setDataAtualizacao(typeof res === "undefined" ? '' : res[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingTotais(false));
    }
    getTotais();
  }, [dataFiltro, reloadTrigger]);

  // Exportação
  useEffect(() => {
    async function getNExportacao() {
      await birel
        .post('(NAT_FATURA_EXPOR)', {
          datanatexpor: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi034.bidata;
          setNExportacao(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingExportacao(false));
    }
    getNExportacao();
  }, [dataFiltro, reloadTrigger]);

  const isLoading = loadingFiliais || loadingAssociacao || loadingTotais || loadingExportacao;
  const handleRetry = () => {
    setHasError(false);
    setLoadingFiliais(true);
    setLoadingAssociacao(true);
    setLoadingTotais(true);
    setLoadingExportacao(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/naturovos/nproducao"
        forwards="/naturovos/nfaturamento"
        depto="naturovos"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuNaturovos />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white mt-2 rounded-md shadow-sm p-2">
          <div className="flex items-center justify-start md:gap-4 gap-2 overflow-x-auto">
            <ButtonAnaliseNaturovos
              title={'Filiais'}
              onclick={() => setAnalise('filiais')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Associação'}
              onclick={() => setAnalise('associacao')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Exportação'}
              onclick={() => setAnalise('exportacao')}
              active={analise}
            />
          </div>
        </div>
        <div className="mt-2">
          {analise === 'filiais' && (
            <NFiliais totais={nTotais} data={nFiliais} loading={isLoading} hasError={hasError} onRetry={handleRetry} />
          )}
          {analise === 'associacao' && (
            <NAssociacao totais={nTotais} data={nAssociacao} loading={isLoading} hasError={hasError} onRetry={handleRetry} />
          )}
          {analise === 'exportacao' && (
            <NExportacao totais={nTotais} data={nExportacao} loading={isLoading} hasError={hasError} onRetry={handleRetry} />
          )}
        </div>
      </div>
    </main>
  );
};

export default NResumo;
