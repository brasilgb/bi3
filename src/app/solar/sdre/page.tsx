'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import MainMenu from '@/components/MainMenu';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import SDreGrupo from './sdregrupo';
import SDreSolar from './sdresolar';
import moment from 'moment';
import birel from '@/services/birel';

type Props = {};

const SDre = (props: Props) => {
  const [analise, setAnalise] = useState<string>('dresolar');
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  useEffect(() => {
    const getDreEstrutura = async () => {
      await birel
        .get(`(DRE_ESTRU)`)
        .then(response => {
          setDataAtualizacao(response.data.bi058.bidata[0].Atualizacao);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDreEstrutura();
  }, []);

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/solar/semprestimos"
        forwards=""
        depto="loja"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-2">
        <MainMenu />
      </div>
      <div className="container m-auto">
        <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
          <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
            <ButtonAnalise
              title={'DRE Solar'}
              onclick={() => setAnalise('dresolar')}
              active={analise}
            />
            <ButtonAnalise
              title={'DRE Grupo'}
              onclick={() => setAnalise('dregrupo')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'dresolar' && <SDreSolar />}
            {analise === 'dregrupo' && <SDreGrupo />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SDre;
