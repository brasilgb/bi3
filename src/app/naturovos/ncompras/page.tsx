'use client';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';

import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import NCompDiario from "./ncompdiario";
import NComPerformance from "./ncomperformance";
import NComPerformanceMes from "./ncomperformancemes";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";
import NComPerformanceTipo from "./ncomperformancetipo";

type Props = {};

const NCompras = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [analise, setAnalise] = useState<string>('compdiario');
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  useEffect(() => {
    async function getLComTotais() {
      await birel
        .post('(LOJ_COM_TOTAL)', {
          datalojtotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setDataAtualizacao(results.data.bi005.bidata[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComTotais();
  }, [dataFiltro]);
  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/naturovos/nfaturamento"
        forwards="/naturovos/nadmresumo"
        depto="naturovos"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuNaturovos />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
          <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
            <ButtonAnaliseNaturovos
              title={'Comp. diário'}
              onclick={() => setAnalise('compdiario')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Performance'}
              onclick={() => setAnalise('performance')}
              active={analise}
            />
              <ButtonAnaliseNaturovos
                title={'Perform. mês'}
                onclick={() => setAnalise('performmes')}
                active={analise}
              />
            <ButtonAnaliseNaturovos
              title={'Perform. Tipo.'}
              onclick={() => setAnalise('performtipo')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'compdiario' && <NCompDiario />}
            {analise === 'performance' && <NComPerformance />}
            {analise === 'performtipo' && <NComPerformanceTipo />}
            {analise === 'performmes' && <NComPerformanceMes />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NCompras;
