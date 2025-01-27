'use client';
import ButtonAnaliseNaturovos from '@/components/ButtonAnaliseNaturovos';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import birel from '@/services/birel';
import { useAuthContext } from '@/contexts/AuthContext';
import NResdiario from "./nresdiario";
import NPerformance from "./nperformance";
import NPerfAssociacao from "./nperfassociacao";
import NPerfMes from "./nperfmes";
import MainMenuNaturovos from "@/components/MainMenu/naturovos";

type Props = {};

const NFaturamento = (props: Props) => {
  const [analise, setAnalise] = useState<string>('resumo');
  const { dataFiltro } = useAuthContext();
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(NAT_FAT_TOTAIS)', {
          datanattotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi029.bidata;
          setDataAtualizacao(typeof res === "undefined" ? '' : res[0].Atualizacao);
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
        back="/naturovos/nresumo"
        forwards="/naturovos/ncompras"
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
              title={'Resumo'}
              onclick={() => setAnalise('resumo')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Performance'}
              onclick={() => setAnalise('performance')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Perform. Assoc.'}
              onclick={() => setAnalise('performassoc')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Perform. Mês'}
              onclick={() => setAnalise('performmes')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'resumo' && <NResdiario />}
            {analise === 'performance' && <NPerformance />}
            {analise === 'performassoc' && <NPerfAssociacao />}
            {analise === 'performmes' && <NPerfMes />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NFaturamento;
