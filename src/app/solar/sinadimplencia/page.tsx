'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import Vencidos from './vencidos';
import birel from '@/services/birel';
import moment from 'moment';
import MainMenuSolar from "@/components/MainMenu/solar";

type Props = {};

const SInadimplencia = (props: Props) => {
  const [analise, setAnalise] = useState<string>('vencidos');
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  
  useEffect(() => {
    async function getVencidaosTotais() {
      await birel
        .get('(LOJVEN_INADIM)')
        .then(results => {
          setDataAtualizacao(results.data.bi062.bidata[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getVencidaosTotais();
  }, []);

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/solar/sanalisevenda"
        forwards="/solar/scompras"
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
              title={'Vencidos'}
              onclick={() => setAnalise('vencidos')}
              active={analise}
            />
          </div>
          <div className="mt-2">{analise === 'vencidos' && <Vencidos />}</div>
        </div>
      </div>
    </main>
  );
};

export default SInadimplencia;
