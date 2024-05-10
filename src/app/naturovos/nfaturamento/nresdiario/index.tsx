import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, removeAcentos } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import NResGrupo from "./nresgrupo";
import { IoChevronDown } from "react-icons/io5";

const NResdiario = () => {
  const { dataFiltro } = useAuthContext();
  const [nFatuSetor, setNFatuSetor] = useState<any>([]);
  const [nFatuTotais, setNFatuTotais] = useState<any>([]);
  const [openAccordion, setOpenAccordion] = useState(null);


  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNFatuSetor() {
      await birel
        .post('(NAT_FAT_SETOR)', {
          datanatsetor: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNFatuSetor(results.data.bi024.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNFatuSetor();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNFatuTotais() {
      await birel
        .post('(NAT_FAT_TOTAIS)', {
          datanattotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNFatuTotais(results.data.bi029.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNFatuTotais();
  }, [dataFiltro]);

  const handleAccordionClick = (index: any) => {
    if (index !== openAccordion) {
      setOpenAccordion(index);
    } else {
      setOpenAccordion(null);
    }
  };

  return (
    <div className="w-full rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="bg-solar-orange-prymary">
            <BTh classname="w-0"><></></BTh>
            <BTh classname="w-16">Setor</BTh>
            <BTh classname="w-16">Venda dia {nFatuTotais[0]?.DiaAtual}</BTh>
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
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd><></></BTd>
            <BTd>Total</BTd>
            <BTd>{formatMoney(nFatuTotais[0]?.DiaVendaDia)}</BTd>
            <BTd>{(nFatuTotais[0]?.DiaMargemDia * 100).toFixed(2)}%</BTd>
            <BTd>{formatMoney(nFatuTotais[0]?.DiaVendaSemana)}</BTd>
            <BTd>{(nFatuTotais[0]?.DiaMargemSemana * 100).toFixed(2)}%</BTd>
            <BTd>{formatMoney(nFatuTotais[0]?.DiaVendaMes)}</BTd>
            <BTd>{(nFatuTotais[0]?.DiaMargemMes * 100).toFixed(2)}%</BTd>
            <BTd>{(nFatuTotais[0]?.DiaRepTotal * 100).toFixed(2)}%</BTd>
            <BTd><></></BTd>
            <BTd><></></BTd>
            <BTd><></></BTd>
            <BTd><></></BTd>
            <BTd><></></BTd>
          </BTr>
          {nFatuSetor
            .sort((a: any, b: any) =>
              parseInt(a.VendaMes) < parseInt(b.VendaMes) ? 1 : -1
            )
            .map((setor: any, idx: any) => (
              <>
                <BTr
                  key={idx}
                  onclick={() => handleAccordionClick(idx)}
                  classname={`${openAccordion === idx ? 'bg-gray-300 active:bg-gray-300 hover:bg-gray-300' : idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50 '} text-gray-500 active:bg-gray-300 hover:bg-red-50 cursor-pointer`}
                >
                  <BTd classname="flex justify-start"><IoChevronDown size={20} color={openAccordion === idx ? '#2168eb':'#bebbbb'} className={`duration-300 ${openAccordion === idx ? '-rotate-180' : 'rotate-0'}`} /></BTd>
                  <BTd>{setor.Setor}</BTd>
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
                <BTr classname="">
                  <BTd colspan={14} classname={`!px-0 ${openAccordion === idx ? "" : "hidden"}`}>
                    <NResGrupo setor={setor.Setor} />
                  </BTd>
                </BTr>
              </>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NResdiario;
