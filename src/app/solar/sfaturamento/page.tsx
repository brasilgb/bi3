'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import SResdiario from './sresdiario';
import SPerformance from './sperformance';
import SPerfAssociacao from './sperfassociacao';
import SPerfMes from './sperfmes';
import moment from 'moment';
import birel from '@/services/birel';
import { useAuthContext } from '@/contexts/AuthContext';
import MainMenuSolar from "@/components/MainMenu/solar";

type Props = {};

const SFaturamento = (props: Props) => {
  const [analise, setAnalise] = useState<string>('resumodiario');
  const { dataFiltro } = useAuthContext();
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_FATUTO)', {
          datalojfatuto: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi007.bidata;
          setDataAtualizacao(typeof res === "undefined" ? [] : res[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);
  
  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/solar/sresumo"
        forwards="/solar/sanalisevenda"
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
              title={'Resumo diário'}
              onclick={() => setAnalise('resumodiario')}
              active={analise}
            />
            <ButtonAnalise
              title={'Performance'}
              onclick={() => setAnalise('performance')}
              active={analise}
            />
            <ButtonAnalise
              title={'Perform. Assoc.'}
              onclick={() => setAnalise('performassoc')}
              active={analise}
            />
            <ButtonAnalise
              title={'Perform. Mês'}
              onclick={() => setAnalise('performmes')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'resumodiario' && <SResdiario />}
            {analise === 'performance' && <SPerformance />}
            {analise === 'performassoc' && <SPerfAssociacao />}
            {analise === 'performmes' && <SPerfMes />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SFaturamento;
