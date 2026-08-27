'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import FluxoSolar from './fluxosolar';
import FluxoGrupo from './fluxogrupo';
import FluxoSolarData from './fluxosolardata';
import FluxoGrupoData from './fluxogrupodata';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import MainMenuSolar from "@/components/MainMenu/solar";
import AlertData from '@/components/AlertData';
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';

type Props = {};

const SFluxo = (props: Props) => {
  const [analise, setAnalise] = useState<string>('fluxolojas');
  const { dataInicial, dataFinal } = useAuthContext();
  const [dataAtualizacao, setDataAtualizacao] = useState<string>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );

  const [fluxoData, setFluxoData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    async function getFluxoCaixaLojas() {
      await birel
        .post('(FLUXO_DE_CAIXA)', {
          fluxoTipreg: 1,
          fluxoDepto: 1,
          fluxoDatini: moment(dataInicial).format('YYYYMMDD'),
          fluxoDatfin: moment(dataFinal).format('YYYYMMDD'),
        })
        .then(results => {
          const bidata = results.data.bi054.bidata || [];
          setFluxoData(bidata);
          const cabecalho = bidata.filter((a: any) => a.agrupador === 0);
          if (cabecalho[0]?.atualizacao) {
            setDataAtualizacao(cabecalho[0].atualizacao);
          }
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoading(false));
    }
    getFluxoCaixaLojas();
  }, [dataInicial, dataFinal, reloadTrigger]);

  const handleRetry = () => {
    setHasError(false);
    setLoading(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/solar/scompras"
        forwards="/solar/semprestimos"
        depto="loja"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuSolar />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
          {loading ? (
            <LoadingRows />
          ) : hasError ? (
            <ErrorRetry onRetry={handleRetry} />
          ) : fluxoData.length > 0 ? (
            <>
              <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
                <ButtonAnalise
                  title={'Fluxo Lojas'}
                  onclick={() => setAnalise('fluxolojas')}
                  active={analise}
                />
                <ButtonAnalise
                  title={'Fluxo Grupo'}
                  onclick={() => setAnalise('fluxogrupo')}
                  active={analise}
                />
                <ButtonAnalise
                  title={'Fluxo Lojas/Data'}
                  onclick={() => setAnalise('fluxolojasdata')}
                  active={analise}
                />
                <ButtonAnalise
                  title={'Fluxo Grupo/Data'}
                  onclick={() => setAnalise('fluxogrupodata')}
                  active={analise}
                />
              </div>
              <div className="mt-2">
                {analise === 'fluxolojas' && <FluxoSolar />}
                {analise === 'fluxogrupo' && <FluxoGrupo />}
                {analise === 'fluxolojasdata' && <FluxoSolarData />}
                {analise === 'fluxogrupodata' && <FluxoGrupoData />}
              </div>
            </>
          ) : (
            <AlertData />
          )}

        </div>
      </div>
    </main>
  );
};

export default SFluxo;
