'use client';
import ButtonAnaliseNaturovos from '@/components/ButtonAnaliseNaturovos';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import birel from '@/services/birel';
import { useAuthContext } from '@/contexts/AuthContext';

import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import NResumo from "./nresumo";
import NEvolucao from "./nevolucao";

type Props = {};

const NAdmResumo = (props: Props) => {
  const [analise, setAnalise] = useState<string>('resfaturamento');
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
          setDataAtualizacao(results.data.bi0290.bidata[0].Atualizacao);
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
        back="/naturovos/ncompras"
        forwards="/naturovos/nfluxo"
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
              title={'Res. faturamento'}
              onclick={() => setAnalise('resfaturamento')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Evolução'}
              onclick={() => setAnalise('evolucao')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'resfaturamento' && <NResumo />}
            {analise === 'evolucao' && <NEvolucao />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NAdmResumo;
