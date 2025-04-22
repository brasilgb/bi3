import AlertData from '@/components/AlertData';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SResdiario = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lFaturamento, setLFaturamento] = useState<any>([]);
  const [lFatuTotLojas, setLFatuTotLojas] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFaturamento() {
      await birel
        .post('(LOJ_FAT_FATURA)', {
          datalojfatura: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi006.bidata;
          setLFaturamento(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFaturamento();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_FATUTO)', {
          datalojfatuto: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi007.bidata;
          setLFatuTotLojas(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);

  return (
    <>
      {lFaturamento.length > 0
        ? <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-50">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Associação</BTh>
                <BTh classname="w-16">Venda dia {lFatuTotLojas[0]?.DiaAtual}</BTh>
                <BTh classname="w-16">Margem</BTh>
                <BTh classname="w-16">
                  Venda dia {lFatuTotLojas[0]?.DiaAnterior}
                </BTh>
                <BTh classname="w-16">Margem</BTh>
                <BTh classname="w-16">Venda Semana</BTh>
                <BTh classname="w-16">Margem</BTh>
                <BTh classname="w-16">Venda Mês</BTh>
                <BTh classname="w-16">Margem</BTh>
                <BTh classname="w-16">
                  <></>
                </BTh>
                <BTh classname="w-16">Rep.</BTh>
                <BTh classname="w-16">
                  <></>
                </BTh>
                <BTh classname="w-16">Juros Mês</BTh>
                <BTh classname="w-16">Rep.</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FatuDia)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.MargemDia * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FatuAnterior)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.MargemAnterior * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FatuSemana)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.MargemSemana * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.FatuMes)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.MargemMes * 100).toFixed(2)}%</BTd>
                <BTd>
                  <></>
                </BTd>
                <BTd>{(lFatuTotLojas[0]?.RepFatu * 100).toFixed(2)}%</BTd>
                <BTd>
                  <></>
                </BTd>
                <BTd>{formatMoney(lFatuTotLojas[0]?.JurosSPM)}</BTd>
                <BTd>{(lFatuTotLojas[0]?.RepSemFatu * 100).toFixed(2)}%</BTd>
              </BTr>
              {lFaturamento
                .sort((a: any, b: any) =>
                  parseInt(a.FatuMes) < parseInt(b.FatuMes) ? 1 : -1
                )
                .map((associacao: any, idx: number) => (
                  <BTr
                    key={idx}
                    classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
                  >
                    <BTd>{associacao.Associacao}</BTd>
                    <BTd>{formatMoney(associacao?.FatuDia)}</BTd>
                    <BTd>{(associacao?.MargemDia * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao?.FatuAnterior)}</BTd>
                    <BTd>{(associacao?.MargemAnterior * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao?.FatuSemana)}</BTd>
                    <BTd>{(associacao?.MargemSemana * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao?.FatuMes)}</BTd>
                    <BTd>{(associacao?.MargemMes * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao?.CompDia * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao?.RepFatu * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao?.CompMes * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao?.JurosSPM)}</BTd>
                    <BTd>{(associacao?.RepSemFatu * 100).toFixed(2)}%</BTd>
                  </BTr>
                ))}
            </tbody>
          </BTable>
        </div>
        : <AlertData />
      }
    </>
  );
};

export default SResdiario;
