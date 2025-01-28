'use client'
import AlertData from '@/components/AlertData'
import LAnaliseCliente from '@/components/Charts/LAnaliseCliente'
import { BTable, BTd, BTh, BTr } from '@/components/Table'
import { useAuthContext } from '@/contexts/AuthContext'
import birel from '@/services/birel'
import { formatMoney } from '@/utils'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'

const SituacaoCliente = () => {
  const { dataFiltro } = useAuthContext();
  const [situacao, setSituacao] = useState<any>([]);
  const [allPlanos, setAllPlanos] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  const [graficoCliente, setGraficoCliente] = useState<any>([]);

  useEffect(() => {
    const getMeioPag = (async () => {
      await birel.post('(SITU_ANALISE_CLIENTE)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((results) => {
          const res = results.data.bi099.bidata;
          const ajust = typeof res === "undefined" ? [] : res;
          setAllData(ajust?.sort((a: any, b: any) => (parseInt(a.CodPlano) > parseInt(b.CodPlano) ? 1 : -1)));
          setAllPlanos(ajust?.map((c: any) => c.CodPlano).filter((value: any, index: any, self: any) => self.indexOf(value) === index));
          setSituacao(ajust?.map((c: any) => c.Situacao).filter((value: any, index: any, self: any) => self.indexOf(value) === index).sort());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => console.log('ok')
        )
    });
    getMeioPag();
  }, [dataFiltro]);

  useEffect(() => {
    const getMeioPag = (async () => {
      await birel.post('(SITU_GRAFICO_CLIENTE)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((results) => {
          const res = results.data.bi100.bidata;
          setGraficoCliente(typeof res === "undefined" ? [] : res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => console.log('ok')
        )
    });
    getMeioPag();
  }, [dataFiltro]);

  const valuesPlanos = (plano: string, situacao: string, campo: string) => {
    const planoPag = allData.filter((fplano: any) => (fplano?.CodPlano == plano && fplano?.Situacao == situacao)).map((vd: any) => (campo == 'Vendas' ? vd?.Vendas : vd?.QtdCliente));
    return planoPag;
  }

  return (
    <>
      {graficoCliente.length > 0
        ? <main className='animate__animated animate__fadeIn'>
          <div className='bg-white rounded-md shadow-sm border sm:mx-0 border-white p-2 w-full overflow-auto'>
            <LAnaliseCliente data={graficoCliente} />
          </div>
          <div className="container sm:mx-auto bg-white rounded-md shadow-sm border-4 border-white mt-4 h-72 overflow-auto">
            <BTable classname='relative'>
              <thead className='sticky top-0 z-10'>
                <BTr classname='text-gray-700 bg-gray-100'>
                  <BTh classname='text-center'><></></BTh>
                  {situacao?.map((situ: any, sdx: number) => (
                    <Fragment key={sdx}>
                      <BTh colspan={2} classname='sm:text-base text-xs text-center'>
                        <div className='border-b-2 border-gray-300'>{situ}</div>
                      </BTh>
                    </Fragment>
                  ))}
                </BTr>
                <BTr classname='text-gray-700 bg-gray-100 sm:text-sm text-xs'>
                  <BTh>Plano Pagto.</BTh>
                  {situacao?.map((situ: any, sdx: number) => (
                    <Fragment key={sdx}>
                      <BTh>Venda</BTh>
                      <BTh>Cliente</BTh>
                    </Fragment>
                  ))}
                </BTr>
              </thead>
              <tbody>
                {allPlanos?.map((plano: any, fdx: number) => (
                  <BTr key={fdx} classname={`text-gray-500 text-base ${fdx % 2 === 1 ? 'bg-gray-100' : 'bg-gray-50'} sm:text-base text-xs`}>
                    <BTd>{plano}</BTd>
                    {situacao?.map((situ: any, ddx: number) => (
                      <Fragment key={ddx}>
                        <BTd>{formatMoney(valuesPlanos(plano, situ, 'Vendas'))}</BTd>
                        <BTd>{valuesPlanos(plano, situ, 'QtdCliente')}</BTd>
                      </Fragment>
                    ))}
                  </BTr>
                ))}
              </tbody>
            </BTable>
          </div>
        </main>
        : <AlertData />
      }
    </>
  )
}

export default SituacaoCliente