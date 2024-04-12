import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const STInstituicao = (props: Props) => {
  const { dataInicial, dataFinal } = useAuthContext();
  const [lEmprestimos, setLInstituicao] = useState([]);
  console.log(
    moment(dataInicial).format('YYYYMMDD'),
    moment(dataFinal).format('YYYYMMDD')
  );

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getInstituicao() {
      await birel
        .post('(EMPRESTIMOS)', {
          agrupa: 2,
          tipo: 1,
          datini: moment(dataInicial).format('YYYYMMDD'),
          datfin: moment(dataFinal).format('YYYYMMDD'),
        })
        .then(results => {
          setLInstituicao(results.data.bi056.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getInstituicao();
  }, [dataInicial, dataFinal]);

  return (
    <div className="w-full bg-solar-blue-dark rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-50">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Instituição</BTh>
            <BTh classname="w-16">Valor</BTh>
            <BTh classname="w-16">Rep.</BTh>
          </BTr>
        </thead>
        <tbody>
          {lEmprestimos
            .filter((t: any) => t.agrupa === 'TOTAL')
            .map((total: any, idx: number) => (
              <BTr key={idx} classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(total?.valor)}</BTd>
                <BTd>{parseFloat(total?.percentual).toFixed(2)}%</BTd>
              </BTr>
            ))}
          {lEmprestimos
            .filter((t: any) => t.agrupa !== 'TOTAL')
            .sort((a: any, b: any) => (a.valor < b.valor ? 1 : -1))
            .map((emprestimo: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{emprestimo?.agrupa}</BTd>
                <BTd>{formatMoney(emprestimo?.valor)}</BTd>
                <BTd>{(emprestimo?.percentual).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default STInstituicao;
