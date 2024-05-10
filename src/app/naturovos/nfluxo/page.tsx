'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import NFluxoNaturovos from "./nfluxonaturovos";
import NFluxoGrupo from "./nfluxogrupo";
import NFluxoNaturovosData from "./nfluxonaturovosdata";
import NFluxoGrupoData from "./nfluxogrupodata";
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";

type Props = {};

const NFluxo = (props: Props) => {
  const [analise, setAnalise] = useState<string>('fluxonaturovos');
  const { dataInicial, dataFinal } = useAuthContext();
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );

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
          setDataAtualizacao(
            results.data.bi054.bidata.filter((a: any) => a.agrupador === 0)
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
    getFluxoCaixaLojas();
  }, [dataInicial, dataFinal]);

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/naturovos/nadmresumo"
        forwards="/naturovos/ndre"
        depto="naturovos"
        dtatu={dataAtualizacao[0].atualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuNaturovos />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
          <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
            <ButtonAnaliseNaturovos
              title={'Fluxo naturovos'}
              onclick={() => setAnalise('fluxonaturovos')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Fluxo Grupo'}
              onclick={() => setAnalise('fluxogrupo')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Fluxo Nat./Data'}
              onclick={() => setAnalise('fluxonatdata')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Fluxo Grupo/Data'}
              onclick={() => setAnalise('fluxogrupodata')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'fluxonaturovos' && <NFluxoNaturovos />}
            {analise === 'fluxogrupo' && <NFluxoGrupo />}
            {analise === 'fluxonatdata' && <NFluxoNaturovosData />}
            {analise === 'fluxogrupodata' && <NFluxoGrupoData />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NFluxo;
