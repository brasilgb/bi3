'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SFiliais from './sfiliais';
import SAssociacao from './sassociacao';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import MainMenuSolar from "@/components/MainMenu/solar";

type Props = {};

const SResumo = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [analise, setAnalise] = useState<string>('filiais');
  const [lFiliais, setLFiliais] = useState<any>([]);
  const [lAssociacao, setLAssociacao] = useState([]);
  const [lTotais, setLTotais] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
);
  const [loadingFiliais, setLoadingFiliais] = useState(true);
  const [loadingAssociacao, setLoadingAssociacao] = useState(true);
  const [loadingTotais, setLoadingTotais] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFiliais() {
      await birel
        .post('(LOJ_FATU_FILIAL)', {
          datalojfilial: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi039.bidata;
          setLFiliais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingFiliais(false));
    }
    getLFiliais();
  }, [dataFiltro, reloadTrigger]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLAssociacao() {
      await birel
        .post('(LOJ_FATU_ASSOCI)', {
          datalojassoci: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi038.bidata;
          setLAssociacao(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingAssociacao(false));
    }
    getLAssociacao();
  }, [dataFiltro, reloadTrigger]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(LOJ_FATU_TOTAL)', {
          datalojfatutotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi040.bidata;
          setLTotais(typeof res === "undefined" ? [] : res);
          setDataAtualizacao(typeof res === "undefined" ? [] : res[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoadingTotais(false));
    }
    getTotais();
  }, [dataFiltro, reloadTrigger]);

  const isLoading = loadingFiliais || loadingAssociacao || loadingTotais;
  const handleRetry = () => {
    setHasError(false);
    setLoadingFiliais(true);
    setLoadingAssociacao(true);
    setLoadingTotais(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/solar"
        forwards="/solar/sfaturamento"
        depto="loja"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuSolar />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white mt-2 rounded-md shadow-sm p-2">
          <div className="flex items-center justify-start md:gap-4 gap-2">
            <ButtonAnalise
              title={'Filiais'}
              onclick={() => setAnalise('filiais')}
              active={analise}
            />
            <ButtonAnalise
              title={'Associação'}
              onclick={() => setAnalise('associacao')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'filiais' && (
              <SFiliais totais={lTotais} data={lFiliais} loading={isLoading} hasError={hasError} onRetry={handleRetry} />
            )}
            {analise === 'associacao' && (
              <SAssociacao totais={lTotais} data={lAssociacao} loading={isLoading} hasError={hasError} onRetry={handleRetry} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SResumo;
