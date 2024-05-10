'use client';
import ButtonAnalise from '@/components/ButtonAnalise';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import birel from '@/services/birel';
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import NDreGrupo from "./ndregrupo";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";
import NDreNaturovos from "./ndrenaturovos";

const NDre = () => {
  const [analise, setAnalise] = useState<string>('drenaturovos');
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
        back="/naturovos/nfluxo"
        forwards=""
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
              title={'DRE Naturovos'}
              onclick={() => setAnalise('drenaturovos')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'DRE Grupo'}
              onclick={() => setAnalise('dregrupo')}
              active={analise}
            />
          </div>
          <div className="mt-2">
            {analise === 'drenaturovos' && <NDreNaturovos />}
            {analise === 'dregrupo' && <NDreGrupo />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NDre;
