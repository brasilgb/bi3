'use client'
import DonutChart from '@/components/Charts/DonutChart'
import KpiContainer from '@/components/KpiContainer'
import { Kpi } from '@/components/Kpis'
import MainMenuSolar from '@/components/MainMenu/solar'
import SubBarTop from '@/components/SubBarTop'
import { BTable, BTd, BTh, BTr } from '@/components/Table'
import { useAuthContext } from '@/contexts/AuthContext'
import birel from '@/services/birel'
import { formatMoney, formatPercent } from '@/utils'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineLineChart } from 'react-icons/ai'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { GiReceiveMoney } from 'react-icons/gi'
import { TbChartHistogram } from 'react-icons/tb'

type Props = {}

const SAnaliseVenda = (props: Props) => {
  const { dataFiltro } = useAuthContext();

  const [meioPag, setMeioPag] = useState<any>([]);
  const [meioPagTotal, setMeioPagTotal] = useState<any>([]);
  const [meioPagFilial, setMeioPagFilial] = useState<any>([]);
  const [meioPagFilTotal, setMeioPagFilTotal] = useState<any>([]);
  const [allFiliais, setAllFiliais] = useState<any>([]);
  const [allMeios, setAllMeios] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
      moment().format('DD/MM/YYYY HH:mm:ss')
    );

  useEffect(() => {
    const getMeioPag = (async () => {
      await birel.post('(MEIO_PAGAMENTO)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((res) => {
          setMeioPag(res.data.bi095.bidata);
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
      await birel.post('(MEIO_PAGAMENTO_TOTAL)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((res) => {
          setMeioPagTotal(res.data.bi096.bidata);
          setDataAtualizacao(res.data.bi096.bidata[0].Atualizacao);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => console.log('ok')
        )
    });
    getMeioPag();
  }, [dataFiltro, setDataAtualizacao]);

  useEffect(() => {
    const getMeioPag = (async () => {
      await birel.post('(MEIO_PAGAMENTO_FILIAL)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((res) => {
          setMeioPagFilial(res.data.bi097.bidata?.sort((a: any, b: any) => (parseInt(a.VendaDevolucao) < parseInt(b.VendaDevolucao) ? 1 : -1)));
          setAllFiliais(res.data.bi097.bidata?.sort((a: any, b: any) => (parseInt(a.VendaDevolucao) < parseInt(b.VendaDevolucao) ? 1 : -1)).map((c: any) => c.NomeFilial).filter((value: any, index: any, self: any) => self.indexOf(value) === index));
          setAllMeios(res.data.bi097.bidata?.sort((a: any, b: any) => (parseInt(a.VendaDevolucao) < parseInt(b.VendaDevolucao) ? 1 : -1)).map((c: any) => c.MeioPagamento).filter((value: any, index: any, self: any) => self.indexOf(value) === index));
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
      await birel.post('(MEIO_PAGAMENTO_FILIAL_TOTAL)', {
        datachave: moment(dataFiltro).format('YYYYMMDD'),
      })
        .then((res) => {
          setMeioPagFilTotal(res.data.bi098.bidata);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => console.log('ok')
        )
    });
    getMeioPag();
  }, [dataFiltro]);

  console.log(dataAtualizacao);
  const valuesFiliais = (meio: string, filial: string, campo: string) => {
    const meiofilial = meioPagFilial.filter((fmeio: any) => (fmeio?.MeioPagamento == meio && fmeio?.NomeFilial == filial)).map((vd: any) => (campo == 'VendaDevolucao' ? vd?.VendaDevolucao : vd?.PercentVenda));
    return meiofilial;
  }

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
        {meioPagTotal?.map((pagtot: any, adx: number) => (
          <KpiContainer key={adx}>
            <Kpi
              icon={<AiOutlineLineChart size={28} />}
              title={'Meta Rede'}
              value={formatMoney(pagtot?.MetaRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
            <Kpi
              icon={<GiReceiveMoney size={28} />}
              title={'Vendas/Devolução Rede'}
              value={formatMoney(pagtot?.VenDevRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
            <Kpi
              icon={<GiReceiveMoney size={28} />}
              title={'% Vendas s/Meta'}
              value={formatPercent(pagtot?.VendaSMetaRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
            <Kpi
              icon={<TbChartHistogram size={28} />}
              title={'% Margem Contrib.'}
              value={formatPercent(pagtot?.MargemContribRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
            <Kpi
              icon={<FaMoneyBillTrendUp size={26} />}
              title={'Juros'}
              value={formatMoney(pagtot?.ValJurosRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
            <Kpi
              icon={<FaMoneyBillTrendUp size={26} />}
              title={'% Juros'}
              value={formatPercent(pagtot?.PercJurosRede)}
              textcolor={'text-solar-blue-secundary'}
              bgcolor={''}
              iconcolor={'text-solar-green-prymary'}
            />
          </KpiContainer>
        ))}
      </div>
      <div className='container sm:mx-auto sm:grid grid-cols-2 gap-4 mt-4 mx-1'>
        <div className='bg-white rounded-md shadow-sm border border-white p-2 w-full overflow-auto'>
          <BTable>
            <thead>
              <BTr>
                <BTh colspan={4} classname='text-center md:text-lg text-xs text-gray-500 font-semibold'>{meioPag[0]?.MesAno}</BTh>
              </BTr>
              <BTr classname='text-gray-700 bg-gray-100 md:text-base text-xs'>
                <BTh>Meio de Pagto</BTh>
                <BTh>Venda/Devolução</BTh>
                <BTh>% Venda s/Tot</BTh>
                <BTh>Qtd.Cliente</BTh>
              </BTr>
              <BTr classname='bg-gray-200 text-gray-500 md:text-base text-xs'>
                <BTh>Total</BTh>
                <BTh>{formatMoney(meioPagTotal[0]?.VenDevRede)}</BTh>
                <BTh>{formatPercent(meioPagTotal[0]?.VendasTotal)}%</BTh>
                <BTh>{meioPagTotal[0]?.QtdCliMesAno}</BTh>
              </BTr>
            </thead>
            <tbody>
              {meioPag?.sort((a: any, b: any) => (a.VendaDevolucao < b.VendaDevolucao ? 1 : -1)).map((mpag: any, bdx: number) => (
                <BTr key={bdx} classname={`text-gray-500 sm:text-base text-xs ${bdx % 2 === 1 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                  <BTd>{mpag?.MeioPagamento}</BTd>
                  <BTd>{formatMoney(mpag?.VendaDevolucao)}</BTd>
                  <BTd>{formatPercent(mpag?.VendasTotal)}%</BTd>
                  <BTd>{mpag?.QtdCliMesAno}</BTd>
                </BTr>
              ))}
            </tbody>
          </BTable>
        </div>
        <div className='bg-white rounded-md shadow-sm border border-gray-50 sm:mt-0 mt-4'>
          <DonutChart data={meioPag} periodo={meioPag[0]?.MesAno} />
        </div>
      </div>
      <div className="container sm:mx-auto mx-1 bg-white rounded-md shadow-sm border-4 border-white mt-4 h-72 overflow-auto">
        <BTable classname='relative'>
          <thead className='sticky top-0 z-10'>
            <BTr classname='text-gray-700 bg-gray-100'>
              <BTh><></></BTh>
              {allMeios?.map((meio: any, mdx: number) => (
                meio != '-' && meio != 'Cartão/PIX/Boleto' && meio != 'Geral' && meio != 'Cheque' &&
                <BTh colspan={2} key={mdx} classname='sm:text-base text-xs text-center'>{meio}</BTh>
              ))}
              <BTh colspan={2} classname='sm:text-base text-xs text-center'>Cartão/PIX/Boleto</BTh>
              <BTh colspan={2} classname='sm:text-base text-xs text-center'>Cheque</BTh>
              <BTh colspan={2} classname='sm:text-base text-xs text-center'>Geral</BTh>
            </BTr>
            <BTr classname='text-gray-700 bg-gray-100 sm:text-base text-xs'>
              <BTh classname='text-center'>Filial</BTh>
              {allMeios?.map((meio: any, mdx: number) => (
                meio != '-' && meio != 'Cartão/PIX/Boleto' && meio != 'Geral' && meio != 'Cheque' &&
                <Fragment key={mdx}>
                  <BTh classname='text-sm'>Venda Devolução</BTh>
                  <BTh classname='text-sm'>% Venda</BTh>
                </Fragment>
              ))}
              <BTh classname='text-sm'>Venda Devolução</BTh>
              <BTh classname='text-sm'>% Venda</BTh>
              <BTh classname='text-sm'>Venda Devolução</BTh>
              <BTh classname='text-sm'>% Venda</BTh>
              <BTh classname='text-sm'>Venda Devolução</BTh>
              <BTh classname='text-sm'>% Venda</BTh>
            </BTr>
          </thead>
          <tbody>
            {allFiliais?.map((filial: any, fdx: number) => (
              filial != '-' &&
              <BTr key={fdx} classname={`text-gray-500 text-base ${fdx % 2 === 1 ? 'bg-gray-100' : 'bg-gray-50'} sm:text-base text-xs`}>
                <BTd>{filial}</BTd>
                {allMeios?.map((meio: any, fdx: number) => (
                  meio != '-' && meio != 'Cartão/PIX/Boleto' && meio != 'Geral' && meio != 'Cheque' &&
                  <Fragment key={fdx}>
                    <BTd>{formatMoney(valuesFiliais(meio, filial, 'VendaDevolucao'))}</BTd>
                    <BTd>{formatPercent(valuesFiliais(meio, filial, 'PercentVenda'))}%</BTd>
                  </Fragment>
                ))}
                <BTd>{formatMoney(valuesFiliais('Cartão/PIX/Boleto', filial, 'VendaDevolucao'))}</BTd>
                <BTd>{formatPercent(valuesFiliais('Cartão/PIX/Boleto', filial, 'PercentVenda'))}%</BTd>
                <BTd>{formatMoney(valuesFiliais('Cheque', filial, 'VendaDevolucao'))}</BTd>
                <BTd>{formatPercent(valuesFiliais('Cheque', filial, 'PercentVenda'))}%</BTd>
                <BTd>{formatMoney(valuesFiliais('Geral', filial, 'VendaDevolucao'))}</BTd>
                <BTd>{formatPercent(valuesFiliais('Geral', filial, 'PercentVenda'))}%</BTd>
              </BTr>
            ))}
          </tbody>
        </BTable>
      </div>
    </main>
  )
}

export default SAnaliseVenda