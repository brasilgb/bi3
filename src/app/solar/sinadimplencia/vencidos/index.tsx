import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import React, { useEffect, useState } from 'react';

type Props = {};

const Vencidos = (props: Props) => {
  const [vencidosTotais, setVencidosTotais] = useState<any>([]);
  const [vencidos, setVencidos] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getVencidaosTotais() {
      await birel
        .get('(LOJVEN_INADIM)')
        .then(results => {
          setVencidosTotais(results.data.bi062.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getVencidaosTotais();
  }, []);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getVencidos() {
      await birel
        .get('(LOJVEN_VENCI)')
        .then(results => {
          setVencidos(results.data.bi061.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getVencidos();
  }, []);

  return (
    <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-50">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Faixa de vencidos</BTh>
            <BTh classname="w-16">Valor vencido</BTh>
            <BTh classname="w-16">Rep.Vencido</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(vencidosTotais[0]?.ValorVencido)}</BTd>
            <BTd>{parseFloat(vencidosTotais[0]?.RepVencido).toFixed(2)}%</BTd>
          </BTr>
          {vencidos
            .sort((a: any, b: any) =>
              parseInt(a.ordemFaixa) < parseInt(b.ordemFaixa) ? 1 : -1
            )
            .map((vencido: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{vencido?.FaixaVencidos}</BTd>
                <BTd>{formatMoney(vencido?.ValorVencido)}</BTd>
                <BTd>{(vencido?.RepVencido * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default Vencidos;
