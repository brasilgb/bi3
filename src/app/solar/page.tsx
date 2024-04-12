'use client';
import Progress from '@/components/Charts/Progress';
import { Kpi } from '@/components/Kpis';
import MainMenu from '@/components/MainMenu';
import SubBarTop from '@/components/SubBarTop';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, formatPercent } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaBoxes } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { GiPayMoney } from 'react-icons/gi';
import { MdMoneyOff } from 'react-icons/md';
import { PiChartLineDown } from 'react-icons/pi';
import { TbChartHistogram } from 'react-icons/tb';

type Props = {};

const Solar = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [totais, setTotais] = useState<any>([]);
  const [fatuTotMesLojas, setFatuTotMesLojas] = useState<any>([]);
  const [inadimplencia, setInadimplencia] = useState<any>([]);
  const [estoque, setEstoque] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );

  // Extração de dados Estoque
  useEffect(() => {
    async function getEstoque() {
      await birel
        .post('(LOJ_FAT_TOTPEFASM)', {
          datalojtotpefasm: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setEstoque(results.data.bi011.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getEstoque();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(LOJ_FATU_TOTAL)', {
          datalojfatutotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setTotais(results.data.bi040.bidata);
          setDataAtualizacao(results.data.bi040.bidata[0].Atualizacao);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getTotais();
  }, [dataFiltro]);

  // Extração de dados Juros
  useEffect(() => {
    async function getFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_FATUTO)', {
          datalojfatuto: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setFatuTotMesLojas(results.data.bi007.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getFatuTotLojas();
  }, [dataFiltro]);

  // Extração de dados inadimplência
  useEffect(() => {
    async function getInadimplencia() {
      await birel
        .get('(LOJVEN_INADIM)')
        .then(results => {
          setInadimplencia(results.data.bi062.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getInadimplencia();
  }, []);

  const colorBar = (value: any) => {
    if (value <= 90) return '#DC2626';
    if (value <= 98) return '#FB923C';
    if (value > 98) return '#10B981';
  };

  const colorKpi = (meta: any, value: any) => {
    if (value < meta) return 'text-red-600';
    if (value > meta) return 'text-emerald-500';
  };

  return (
    <main className="animate__animated animate__fadeIn">
      <SubBarTop
        colors="border-gray-200 text-gray-500"
        back=""
        forwards="/solar/sresumo"
        depto="loja"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-2">
        <MainMenu />
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-4">
          <Kpi
            icon={<GiPayMoney />}
            title={'Vendas (mês)'}
            value={formatMoney(totais[0]?.VendaAgora)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-green'}
          />
          <Kpi
            icon={<GiPayMoney />}
            title={'Vendas (dia)'}
            value={formatMoney(totais[0]?.VendaDia)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-green'}
          />
          <Kpi
            icon={<AiOutlineLineChart />}
            title={'Meta'}
            value={formatMoney(totais[0]?.Meta)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-yellow-200'}
          />
          <Kpi
            icon={<FaMoneyBillTrendUp />}
            title={'Faturamento'}
            value={formatMoney(totais[0]?.Faturamento)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-blue-dark'}
          />
        </div>
        <div className="grid grid-cols-3 md:gap-4 gap-2 md:mt-4 mt-2">
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress
              title="Meta"
              value={formatPercent(totais[0]?.MetaAlcancada)}
              colorBar="#019EE3"
              colorText="#019EE3"
            />
          </div>
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress
              title="Margem"
              value={formatPercent(totais[0]?.Margem)}
              colorBar="#F99F1E"
              colorText="#F99F1E"
            />
          </div>
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress
              title="Projeção"
              value={formatPercent(totais[0]?.Projecao)}
              colorBar="#A7C414"
              colorText="#A7C414"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2 md:mt-4 mt-2">
          <Kpi
            icon={<PiChartLineDown />}
            title={'Vencidos (15 > venc <= 180)'}
            value={formatMoney(inadimplencia[0]?.ValorVencido)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-green'}
            valuerep={formatPercent(inadimplencia[0]?.RepVencido)}
            titlerep="Representa"
          />
          <Kpi
            icon={<MdMoneyOff />}
            title={'Perdas efetivas ( venc > 180)'}
            value={formatMoney(inadimplencia[0]?.ValorPerda)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-green'}
            valuerep={formatPercent(inadimplencia[0]?.RepPerda)}
            titlerep="Representa"
          />
          <Kpi
            icon={<TbChartHistogram />}
            title={'JURO (MÊS)'}
            value={formatMoney(fatuTotMesLojas[0]?.JurosSPM)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-yellow-200'}
            valuerep={formatPercent(fatuTotMesLojas[0]?.RepSemFatu)}
            titlerep="Representa"
          />
          <Kpi
            icon={<FaBoxes />}
            title={'ESTOQUE ATUAL'}
            value={formatMoney(estoque[0]?.EstoqueAss)}
            textcolor={'text-solar-blue-light'}
            bgcolor={''}
            iconcolor={'text-solar-blue-dark'}
            valuerep={formatPercent(estoque[0]?.RepEstoqueAss)}
            titlerep="Representa"
          />
        </div>
      </div>
    </main>
  );
};

export default Solar;
