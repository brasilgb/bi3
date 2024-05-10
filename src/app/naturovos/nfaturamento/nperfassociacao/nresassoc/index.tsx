import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, removeAcentos } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IoChevronForward } from "react-icons/io5";

interface GrupoProps {
  grupo: string;
}

const NResAssoc = ({ grupo }: GrupoProps) => {
  const { dataFiltro } = useAuthContext();
  const [nFatuGrupo, setNFatuGrupo] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNFatuGrupo() {
      await birel
        .post('(NAT_FAT_PREFASSOC)', {
          datanatprefassoc: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const dataGrupo = results.data.bi025.bidata.filter(
            (g: any) => removeAcentos(g.Grupo) === removeAcentos(grupo)
          );
          setNFatuGrupo(dataGrupo);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNFatuGrupo();
  }, [dataFiltro]);
 
  return (
    <div className="w-full animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="!bg-yellow-200">
            <BTh classname="w-0"><></></BTh>
            <BTh classname="w-16">Associação</BTh>
            <BTh classname="w-16">Faturamento</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Rep. Total</BTh>
            <BTh classname="w-16">Preço Médio</BTh>
            <BTh classname="w-16">Preço Médio(Kg)</BTh>
            <BTh classname="w-16">Fat. + EC</BTh>
            <BTh classname="w-16">Rep. + EC</BTh>
            <BTh classname="w-16">Margem + EC</BTh>
          </BTr>
        </thead>
        <tbody>
          {nFatuGrupo
            .sort((a: any, b: any) =>
              parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1
            )
            .map((setor: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd classname="flex justify-end"><IoChevronForward size={20} color="#cacaca" /></BTd>
                <BTd>{setor.Associacao}</BTd>
                <BTd>{formatMoney(setor?.Faturamento)}</BTd>
                <BTd>{(setor?.Margem * 100).toFixed(2)}%</BTd>
                <BTd>{(setor?.RepTotal * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(setor?.PrecoMedio)}</BTd>
                <BTd>{formatMoney(setor?.PrecoMedioKg)}</BTd>
                <BTd>{formatMoney(setor?.FaturamentoEC)}</BTd>
                <BTd>{(setor?.RepEc * 100).toFixed(2)}%</BTd>
                <BTd>{(setor?.MargemEc * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NResAssoc;