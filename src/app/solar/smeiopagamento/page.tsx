'use client'
import ButtonAnalise from '@/components/ButtonAnalise'
import MainMenuSolar from '@/components/MainMenu/solar'
import SubBarTop from '@/components/SubBarTop'
import { useAuthContext } from '@/contexts/AuthContext'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import SAnaliseVenda from './sanalisevenda/page'
import SituacaoCliente from './situacaocliente/page'
import birel from '@/services/birel'

const SMeioPagamento = () => {
    const { dataFiltro } = useAuthContext();
    const [analise, setAnalise] = useState<string>('analisevenda');
    const [dataAtualizacao, setDataAtualizacao] = useState<any>(
        moment().format('DD/MM/YYYY HH:mm:ss')
    );
  useEffect(() => {
    const getMeioPag = (async () => {
      await birel.post('(SITU_GRAFICO_CLIENTE)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((res) => {
          setDataAtualizacao(res.data.bi100.bidata[0].Atualizacao);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => console.log('ok')
        )
    });
    getMeioPag();
  }, [dataFiltro, setDataAtualizacao]);

    return (
        <main>
            <SubBarTop
                colors="border-gray-200 text-gray-500"
                back="/solar/sfaturamento"
                forwards="/solar/sinadimplencia"
                depto="loja"
                dtatu={dataAtualizacao}
            />
            <div className="container m-auto md:px-0 px-1">
                <MainMenuSolar />
            </div>
            <div className='container mx-auto sm:p-0 px-1'>
                <div className="bg-white p-2 mt-2 rounded-md shadow-sm">
                    <div className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
                        <ButtonAnalise
                            title={'Análise Venda'}
                            onclick={() => setAnalise('analisevenda')}
                            active={analise}
                        />
                        <ButtonAnalise
                            title={'Situação Cliente'}
                            onclick={() => setAnalise('situacaocliente')}
                            active={analise}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    {analise === 'analisevenda' && <SAnaliseVenda />}
                    {analise === 'situacaocliente' && <SituacaoCliente />}
                </div>

            </div>
        </main>
    )
}

export default SMeioPagamento