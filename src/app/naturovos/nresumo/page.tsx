'use client';
import SubBarTop from '@/components/SubBarTop';
import React, { useEffect, useState } from 'react';
import birel from '@/services/birel';
import moment from 'moment';
import { useAuthContext } from '@/contexts/AuthContext';
import NAssociacao from "./nassociacao";
import NFiliais from "./nfiliais";
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import ButtonAnaliseNaturovos from "@/components/ButtonAnaliseNaturovos";
import NExportacao from "./nexportacao";

const NResumo = () => {
  const { dataFiltro } = useAuthContext();
  const [analise, setAnalise] = useState<string>('filiais');
  const [nFiliais, setNFiliais] = useState<any>([]);
  const [nAssociacao, setNAssociacao] = useState([]);
  const [nTotais, setNTotais] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  const [nExportacao, setNExportacao] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNFiliais() {
      await birel
        .post('(NAT_FATURA_FILIAL)', {
          datanatfilial: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNFiliais(results.data.bi035.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNFiliais();
  }, [dataFiltro]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNAssociacao() {
      await birel
        .post('(NAT_FATURA_GRUPO)', {
          datanatfatugrupo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNAssociacao(results.data.bi036.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNAssociacao();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(NAT_FATURA_TOTAL)', {
          datanattotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNTotais(results.data.bi037.bidata);
          setDataAtualizacao(results.data.bi037.bidata[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getTotais();
  }, [dataFiltro]);

  // Exportação
  useEffect(() => {
    async function getNExportacao() {
      await birel
        .post('(NAT_FATURA_EXPOR)', {
          datanatexpor: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNExportacao(results.data.bi034.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNExportacao();
  }, [dataFiltro]);

  return (
    <main>
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back="/naturovos/nproducao"
        forwards="/naturovos/nfaturamento"
        depto="naturovos"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-1">
        <MainMenuNaturovos />
      </div>
      <div className="container m-auto md:px-0 px-1">
        <div className="bg-white mt-2 rounded-md shadow-sm p-2">
          <div className="flex items-center justify-start md:gap-4 gap-2 overflow-x-auto">
            <ButtonAnaliseNaturovos
              title={'Filiais'}
              onclick={() => setAnalise('filiais')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Associação'}
              onclick={() => setAnalise('associacao')}
              active={analise}
            />
            <ButtonAnaliseNaturovos
              title={'Exportação'}
              onclick={() => setAnalise('exportacao')}
              active={analise}
            />
          </div> 
        </div>
        <div className="mt-2">
          {analise === 'filiais' && (
            <NFiliais totais={nTotais} data={nFiliais} />
          )}
          {analise === 'associacao' && (
            <NAssociacao totais={nTotais} data={nAssociacao} />
          )}
          {analise === 'exportacao' && (
            <NExportacao totais={nTotais} data={nExportacao} />
          )}
        </div>
      </div>
    </main>
  );
};

export default NResumo;
