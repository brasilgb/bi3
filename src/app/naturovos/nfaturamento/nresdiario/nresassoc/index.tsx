import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, removeAcentos } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IoChevronForward } from "react-icons/io5";
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';

interface GrupoProps {
  grupo: string;
}

const NResAssoc = ({ grupo }: GrupoProps) => {
  const { dataFiltro } = useAuthContext();
  const [nFatuGrupo, setNFatuGrupo] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNFatuGrupo() {
      await birel
        .post('(NAT_FAT_ASSOC)', {
          datanatassoc: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const dataGrupo = results.data.bi022.bidata.filter(
            (g: any) => removeAcentos(g.Grupo) === removeAcentos(grupo)
          );
          setNFatuGrupo(dataGrupo);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoading(false));
    }
    getNFatuGrupo();
  }, [dataFiltro, grupo, reloadTrigger]);

  const handleRetry = () => {
    setHasError(false);
    setLoading(true);
    setReloadTrigger(t => t + 1);
  };

  if (loading) return <LoadingRows rows={2} />;
  if (hasError) return <ErrorRetry onRetry={handleRetry} />;

  return (
    <div className="w-full animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="!bg-yellow-200">
            <BTh classname="w-4"><></></BTh>
            <BTh classname="w-[118px]">Associação</BTh>
            <BTh classname="w-16">Venda dia</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Venda Semana</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Venda Mês</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Rep. Total</BTh>
            <BTh classname="w-16"><></></BTh>
            <BTh classname="w-16">Preço Médio</BTh>
            <BTh classname="w-16"><></></BTh>
            <BTh classname="w-16">Preço Médio(Kg)</BTh>
            <BTh classname="w-16"><></></BTh>
          </BTr>
        </thead>
        <tbody>
          {nFatuGrupo
            .sort((a: any, b: any) =>
              parseInt(a.VendaMes) < parseInt(b.VendaMes) ? 1 : -1
            )
            .map((setor: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-neutral-50'} text-gray-500 transition-colors duration-150 hover:bg-solar-orange-prymary/10`}
              >
                <BTd classname="flex justify-end"><IoChevronForward size={20} color="#cacaca" /></BTd>
                <BTd>{setor?.Associacao}</BTd>
                <BTd>{formatMoney(setor?.VendaDia)}</BTd>
                <BTd>{(setor?.MargemDia * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(setor?.VendaSemana)}</BTd>
                <BTd>{(setor?.MargemSemana * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(setor?.VendaMes)}</BTd>
                <BTd>{(setor?.MargemMes * 100).toFixed(2)}%</BTd>
                <BTd>{(setor?.RepTotal * 100).toFixed(2)}%</BTd>
                <BTd>{(setor?.RepAno * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(setor?.PrecoMedio)}</BTd>
                <BTd>{(setor?.RepPrecoMedio * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(setor?.PrecoMedioKg)}</BTd>
                <BTd>{(setor?.RepPrecoMedioKg * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NResAssoc;