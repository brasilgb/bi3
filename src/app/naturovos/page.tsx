'use client';
import Progress from '@/components/Charts/Progress';
import { Kpi } from '@/components/Kpis';
import MainMenuNaturovos from "@/components/MainMenu/naturovos";
import SubBarTop from '@/components/SubBarTop';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, formatPercent } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';

const Naturovos = () => {
  const { dataFiltro } = useAuthContext();
  const [totais, setTotais] = useState<any>([]);
  const [fatuTotMesLojas, setFatuTotMesLojas] = useState<any>([]);
  const [inadimplencia, setInadimplencia] = useState<any>([]);
  const [estoque, setEstoque] = useState<any>([]);
  const [dataAtualizacao, setDataAtualizacao] = useState<any>(
    moment().format('DD/MM/YYYY HH:mm:ss')
  );
  // Extração de dados resumos totais
  useEffect(() => {
    async function getTotais() {
      await birel
        .post('(NAT_FATURA_TOTAL)', {
          datanattotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi037.bidata;
          setTotais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getTotais();
  }, [dataFiltro]);

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
        forwards="/naturovos/nproducao"
        depto="naturovos"
        dtatu={dataAtualizacao}
      />
      <div className="container m-auto md:px-0 px-2">
        <MainMenuNaturovos />
        <div className="grid md:grid-cols-3 md:gap-4 gap-2 mt-4">
          <Kpi
            icon={<GiPayMoney />}
            title={'Meta'}
            value={formatMoney(totais[0]?.Meta)}
            textcolor={'text-solar-blue-secundary'}
            bgcolor={''}
            iconcolor={'text-solar-green-prymary'}
          />
          <Kpi
            icon={<GiPayMoney />}
            title={'Faturamento'}
            value={formatMoney(totais[0]?.Faturamento)}
            textcolor={'text-solar-blue-secundary'}
            bgcolor={''}
            iconcolor={'text-solar-green-prymary'}
          />
          <Kpi
            icon={<AiOutlineLineChart />}
            title={'Preço médio'}
            value={formatMoney(totais[0]?.PrecoMedio)}
            textcolor={'text-solar-blue-secundary'}
            bgcolor={''}
            iconcolor={'text-solar-yellow-200'}
          />
        </div>
        <div className="grid grid-cols-2 md:gap-4 gap-2 md:mt-4 mt-2">
          <div className="p-4 bg-white rounded-md shadow-sm">
            <Progress
              title="Margem"
              value={formatPercent(totais[0]?.Margem)}
              colorBar="#F99F1E"
              colorText="#F99F1E"
            />
          </div>
          <div className="p-4 bg-white rounded-md shadow-sm">
            <Progress
              title="Projeção"
              value={formatPercent(totais[0]?.Projecao)}
              colorBar="#A7C414"
              colorText="#A7C414"
            />
          </div>
        </div>
      </div>

    </main>
  );
};

export default Naturovos;
