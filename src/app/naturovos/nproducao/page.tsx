'use client';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import birel from '@/services/birel';
import moment from 'moment';
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";
import NResumo from "./nresumo";
import NLoaderIndustria from "./nloader/industria";
import NDescarte from "./ndescarte";

const NProducao = () => {

  const [analise, setAnalise] = useState<string>('resumo');
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  const [resumoProducao48, setResumoProducao48] = useState<any>([]);
  useEffect(() => {
    const getResumoProducao = async () => {
      await birel
        .get('(RESUMO_PRODUCAO)')
        .then(response => {
          const { bidata } = response.data.bi064;
          const filial48 = bidata.filter((fil: any) => fil.filial === 48);
          setResumoProducao48(filial48[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getResumoProducao();
  }, []);

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/naturovos"
        forwards="/naturovos/nresumo"
        depto="naturovos"
        dtatu={resumoProducao48.atualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuNaturovos />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white mt-2 rounded-md shadow-sm p-2">
          <div className="flex items-center justify-start md:gap-4 gap-2 overflow-x-auto">
            <ButtonAnaliseNaturovos
              title={'Resumo'}
              onclick={() => setAnalise('resumo')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Loader Indústria'}
              onclick={() => setAnalise('loaderindustria')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Descarte'}
              onclick={() => setAnalise('descarte')}
              active={analise}
            />
          </div>
        </div>
        <div className="mt-2">
          {analise === 'resumo' && (
            <NResumo />
          )}
          {analise === 'loaderindustria' && (
            <NLoaderIndustria />
          )}
          {analise === 'descarte' && (
            <NDescarte />
          )}
        </div>
      </div>
    </main>
  );
};

export default NProducao;
