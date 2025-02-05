import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import { dreListDataValue } from '@/functions/der-list-data-value';
import birel from '@/services/birel';
import React, { Fragment, useEffect, useState } from 'react';

const NDreGrupo = () => {
  const { yearSelected } = useAuthContext();
  const [dreEstrutura, setDreEstrutura] = useState([]);
  const [dreData, setDreData] = useState([]);
  const [dreDataTotal, setDreDataTotal] = useState([]);
  const [dreDataTotalAnterior, setDreDataTotalAnterior] = useState([]);

  // Extração de dados DRE
  useEffect(() => {
    const getDreEstrutura = async () => {
      await birel
        .get(`(DRE_ESTRU)`)
        .then(response => {
          setDreEstrutura(response.data.bi058.bidata);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDreEstrutura();
  }, []);

  useEffect(() => {
    const getDreData = async () => {
      await birel
        .post(`(DRE_REL)`, {
          dreidenti: 1,
          dredepto: 0,
          drefilial: 0,
          dreano: yearSelected,
        })
        .then(response => {
          const { success, bidata } = response.data.bi057;
          if (!success) {
            setDreData([]);
            return;
          }
          setDreData(bidata);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDreData();
  }, [yearSelected]);

  useEffect(() => {
    const getDreDataTotal = async () => {
      await birel
        .post(`(DRE_REL)`, {
          dreidenti: 4,
          dredepto: 0,
          drefilial: 0,
          dreano: yearSelected,
        })
        .then(response => {
          const { success, bidata } = response.data.bi057;
          if (!success) {
            setDreDataTotal([]);
            return;
          }
          setDreDataTotal(bidata);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDreDataTotal();
  }, [yearSelected]);

  useEffect(() => {
    const getDreDataTotalAnterior = async () => {
      await birel
        .post(`(DRE_REL)`, {
          dreidenti: 7,
          dredepto: 0,
          drefilial: 0,
          dreano: `${yearSelected}`,
        })
        .then(response => {
          const { success, bidata } = response.data.bi057;
          if (!success) {
            setDreDataTotalAnterior([]);
            return;
          }
          setDreDataTotalAnterior(bidata);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDreDataTotalAnterior();
  }, [yearSelected]);

  const titlehead = () => {
    return ` text-sm text-gray-50 text-center border-x`;
  };
  const subhead = () => {
    return `bg-gray-800 text-gray-50 text-sm text-center border-x`;
  };
  const valuehead = () => {
    return `text-sm text-right border-x`;
  };

  const lineTotal = (EstruturaId: any) => {
    let line;
    switch (EstruturaId) {
      case 1:
        line = true;
        break;
      case 10:
        line = true;
        break;
      case 12:
        line = true;
        break;
      case 21:
        line = true;
        break;
      case 26:
        line = true;
        break;
      case 29:
        line = true;
        break;
      case 31:
        line = true;
        break;
      case 32:
        line = true;
        break;
    }
    return line;
  };
  const dreMes = dreData?.filter((fd: any) => (fd.Ano == yearSelected)).map((drd: any) => (drd.Mes)).filter((value: any, index: any, self: any) => self.indexOf(value) === index);

  return (
    <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="">
        <thead>
          <BTr>
            <BTh rowspan={2} classname={`${titlehead()}`}>
              CONTA
            </BTh>
            <BTh colspan={2} classname={`${titlehead()}`}>
              Total ({yearSelected - 1})
            </BTh>
            <BTh colspan={2} classname={`${titlehead()}`}>
              Total ({yearSelected})
            </BTh>
            {dreMes.sort((a: any, b: any) => (parseInt(a) < parseInt(b) ? 1 : -1)).map((dm: any, idx: number) => (
              <Fragment key={idx}>
                {dm == 12 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Dezembro
                  </BTh >
                }
                {dm == 11 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Novembro
                  </BTh>
                }
                {dm == 10 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Outubro
                  </BTh>
                }
                {dm == 9 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Setembro
                  </BTh>
                }
                {dm == 8 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Agosto
                  </BTh>
                }
                {dm == 7 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Julho
                  </BTh>
                }
                {dm == 6 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Junho
                  </BTh>
                }
                {dm == 5 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Maio
                  </BTh>
                }
                {dm == 4 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Abril
                  </BTh>
                }
                {dm == 3 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Março
                  </BTh>
                }
                {dm == 2 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Fevereiro
                  </BTh>
                }
                {dm == 1 &&
                  <BTh colspan={2} classname={`${titlehead()}`}>
                    Janeiro
                  </BTh>
                }
              </Fragment>
            ))}
          </BTr>
          <BTr>
            <BTd classname={`${subhead()}`}>Valor</BTd>
            <BTd classname={`${subhead()} border-gray-800`}>%</BTd>
            <BTd classname={`${subhead()}`}>Valor</BTd>
            <BTd classname={`${subhead()}`}>%</BTd>
            {dreMes.map((idx: number) => (
              <Fragment key={idx}>
                <BTd classname={`${subhead()}`}>Valor {idx}</BTd>
                <BTd classname={`${subhead()}`}>%</BTd>
              </Fragment>
            ))}
          </BTr>
        </thead>
        <tbody>
          {dreEstrutura
            .sort((a: any, b: any) => (a.Ordem > b.Ordem ? 1 : -1))
            .map((estrutura: any, idx: any) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-sm hover:bg-red-50 ${lineTotal(estrutura.EstruturaId) && '!bg-gray-200'}`}
              >
                <BTd classname="!text-xs text-gray-500">
                  {estrutura.Estrutura}
                </BTd>
                <BTd classname={`${valuehead} bg-gray-200`}>
                  {dreListDataValue({
                    data: dreDataTotalAnterior,
                    estrutura: estrutura.EstruturaId,
                    mes: 0,
                    ano: yearSelected - 1,
                    valor: 1,
                    color: "text-solar-red-support"
                  })}
                </BTd>
                <BTd
                  classname={`border-r-4 border-r-gray-800 pr-1 ${valuehead} bg-gray-200`}
                >
                  {dreListDataValue({
                    data: dreDataTotalAnterior,
                    estrutura: estrutura.EstruturaId,
                    mes: 0,
                    ano: yearSelected - 1,
                    valor: 0,
                    color: "text-solar-red-support"
                  })}
                </BTd>
                <BTd classname={`${valuehead} bg-gray-200`}>
                  {dreListDataValue({
                    data: dreDataTotal,
                    estrutura: estrutura.EstruturaId,
                    mes: 0,
                    ano: yearSelected,
                    valor: 1,
                    color: "text-solar-red-support"
                  })}
                </BTd>
                <BTd classname={`${valuehead} bg-gray-200`}>
                  {dreListDataValue({
                    data: dreDataTotal,
                    estrutura: estrutura.EstruturaId,
                    mes: 0,
                    ano: yearSelected,
                    valor: 0,
                    color: "text-solar-red-support"
                  })}
                </BTd>
                {dreMes.sort((a: any, b: any) => (parseInt(a) < parseInt(b) ? 1 : -1)).map((dm: any, idx: number) => (
                  <Fragment key={idx}>
                    {dm == 12 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 12,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 12,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 11 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 11,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 11,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 10 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 10,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 10,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 9 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 9,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 9,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 8 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 8,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 8,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 7 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 7,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 7,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 6 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 6,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 6,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 5 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 5,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 5,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 4 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 4,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 4,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 3 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 3,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 3,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 2 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 2,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 2,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                    {dm == 1 &&
                      <>
                        <BTd classname={`${valuehead}`}>
                          ok
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 1,
                            ano: yearSelected,
                            valor: 1,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                        <BTd classname={`${valuehead}`}>
                          {dreListDataValue({
                            data: dreData,
                            estrutura: estrutura.EstruturaId,
                            mes: 1,
                            ano: yearSelected,
                            valor: 0,
                            color: "text-solar-red-support"
                          })}
                        </BTd>
                      </>
                    }
                  </Fragment>
                ))}
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NDreGrupo;
