'use client'
import ButtonAnalise from '@/components/ButtonAnalise'
import MainMenu from '@/components/MainMenu'
import SubBarTop from '@/components/SubBarTop'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SFiliais from './sfiliais'
import SAssociacao from './sassociacao'
import birel from "@/services/birel"
import moment from "moment"
import { useAuthContext } from "@/contexts/AuthContext"

type Props = {}

const SResumo = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [analise, setAnalise] = useState<string>('filiais');
  const [lFiliais, setLFiliais] = useState<any>([]);
  const [lAssociacao, setLAssociacao] = useState([]);
  const [lTotais, setLTotais] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFiliais() {
      await birel
        .post('(LOJ_FATU_FILIAL)', {
          datalojfilial: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFiliais(results.data.bi039.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFiliais();
  }, [dataFiltro]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLAssociacao() {
      await birel
        .post('(LOJ_FATU_ASSOCI)', {
          datalojassoci: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLAssociacao(results.data.bi038.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLAssociacao();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(LOJ_FATU_TOTAL)', {
          datalojfatutotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLTotais(results.data.bi040.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getTotais();
  }, [dataFiltro]);

  return (
    <main>
      <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
      <div className="container m-auto md:px-0 px-2">
        <MainMenu />
      </div>
      <div className='container m-auto'>

        <div className='bg-white mt-2 rounded-md shadow-sm p-2'>
          <div className='flex items-center justify-start md:gap-4 gap-2'>
            <ButtonAnalise title={'Filiais'} onclick={() => setAnalise('filiais')} active={analise} />
            <ButtonAnalise title={'Associação'} onclick={() => setAnalise('associacao')} active={analise} />
          </div>
          <div className="mt-2">
            {analise === "filiais" &&
              <SFiliais totais={lTotais} data={lFiliais} />
            }
            {analise === "associacao" &&
              <SAssociacao totais={lTotais} data={lAssociacao} />
            }
          </div>
        </div>

      </div>
    </main>
  )
}

export default SResumo