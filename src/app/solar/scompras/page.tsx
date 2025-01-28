'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import SCompDiario from './scompdiario';
import SComPerformance from './scomperformance';
import SComPerformanceAss from './scomperformanceass';
import SComPerformanceMes from './scomperformancemes';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import MainMenuSolar from "@/components/MainMenu/solar";

type Props = {};

const SCompras = (props: Props) => {
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
          const res = results.data.bi005.bidata;
          setDataAtualizacao(typeof res === "undefined" ? [] : res[0].Atualizacao);
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
        back="/solar/sinadimplencia"
        forwards="/solar/sfluxo"
        depto="loja"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuSolar />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
          <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
            <ButtonAnalise
              title={'Comp. diário'}
              onclick={() => setAnalise('compdiario')}
              active={analise}
            />
            <ButtonAnalise
              title={'Performance'}
              onclick={() => setAnalise('performance')}
              active={analise}
            />
            <ButtonAnalise
              title={'Perform. assoc.'}
              onclick={() => setAnalise('performassoc')}
              active={analise}
            />
            <ButtonAnalise
              title={'Perform. mês'}
              onclick={() => setAnalise('performmes')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'compdiario' && <SCompDiario />}
            {analise === 'performance' && <SComPerformance />}
            {analise === 'performassoc' && <SComPerformanceAss />}
            {analise === 'performmes' && <SComPerformanceMes />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SCompras;
