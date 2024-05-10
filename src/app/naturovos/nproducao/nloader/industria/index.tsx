import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';


const NLoaderIndustria = ({ totais, data }: any) => {
  const { dataInicial, dataFinal } = useAuthContext();
  const [dateDistinct, setDateDistinct] = useState([]);
  const [producaoTurno1, setProducaoTurno1] = useState([]);
  const [producaoTurno2, setProducaoTurno2] = useState([]);
  const [producaoTurno3, setProducaoTurno3] = useState([]);
  const [producaoTurnos, setProducaoTurnos] = useState([]);

  useEffect(() => {
    const getProducaoEps = async () => {
      await birel
        .post(`(PRODUCAO_EPS)`, {
          codpro: 1,
          datini: moment(dataInicial).format('YYYYMMDD'),
          datfin: moment(dataFinal).format('YYYYMMDD'),
        })
        .then(response => {
          const { bidata, turnos } = response.data.bi063;

          const turno1 = bidata.filter((t1: any) => t1.turno === 1);
          const turno2 = bidata.filter((t1: any) => t1.turno === 2);
          const turno3 = bidata.filter((t1: any) => t1.turno === 3);
          setDateDistinct(
            bidata
              ?.map((data: any) => data.data)
              .filter(
                (value: any, index: any, array: any) =>
                  array.indexOf(value) === index
              )
          );
          setProducaoTurnos(turnos);
          setProducaoTurno1(turno1);
          setProducaoTurno2(turno2);
          setProducaoTurno3(turno3);
        });
    };
    getProducaoEps();
  }, [dataInicial, dataFinal]);

  const dateToInt = (dt: any) => {
    const dateInt = moment(dt.split('/').reverse().join('-')).format(
      'YYYYMMDD'
    );
    return dateInt;
  };

  return (
    <div className="animate__animated animate__fadeIn">
    <div className="bg-white my-4 rounded-md p-2 relative overflow-auto">
      <table className="w-full text-gray-700 ">
        <thead>
          <tr className="bg-slate-200">
            <th className="text-center bg-gray-200">
              <div className="!w-20">Turnos</div>
            </th>
            <th>
              <div className="text-left !w-24 pl-1">Descrição</div>
            </th>

            {dateDistinct.map((producao: any, index: any) => (
              <th key={index}>
                <div className="text-left !w-24">{producao}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tr>
          <td rowSpan={3} className="text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-gray-500 font-bold text-3xl">A</span>
              <span className="text-gray-500 text-xs">02:18</span>
              <span className="text-gray-500 text-xs">
                {producaoTurno1
                  .map((producao: any) => producao.horfin)
                  .filter(
                    (value: any, index: any, array: any) =>
                      array.indexOf(value) === index
                  )}
              </span>
            </div>
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. cx
          </td>
          {dateDistinct.map((dt: any) =>
            producaoTurno1
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  <span>{Math.round(producao.consumocx)}</span>{' '}
                  <span>({Math.round(producao.percMeta)}%)</span>
                </td>
              ))
          )}
        </tr>
        <tr className="bg-yellow-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. Hr
          </td>

          {dateDistinct.map((dt: any) =>
            producaoTurno1
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  {Math.round(producao.consumohr)}
                </td>
              ))
          )}
        </tr>

        <tr>
          <td
            colSpan={dateDistinct.length + 2}
            className="bg-gray-200 py-1 w-full"
          ></td>
        </tr>

        <tr>
          <td rowSpan={3} className="text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-gray-500 font-bold text-3xl">B</span>
              <span className="text-gray-500 text-xs">
                {producaoTurno2
                  .map((producao: any) => producao.horini)
                  .filter(
                    (value: any, index: any, array: any) =>
                      array.indexOf(value) === index
                  )}
              </span>
              <span className="text-gray-500 text-xs">
                {producaoTurno2
                  .map((producao: any) => producao.horfin)
                  .filter(
                    (value: any, index: any, array: any) =>
                      array.indexOf(value) === index
                  )}
              </span>
            </div>
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. cx
          </td>

          {dateDistinct.map((dt: any) =>
            producaoTurno2
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  {Math.round(producao.consumocx)} (
                  {Math.round(producao.percMeta)}%)
                </td>
              ))
          )}
        </tr>

        <tr className="bg-yellow-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. Hr
          </td>

          {dateDistinct.map((dt: any) =>
            producaoTurno2
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  {Math.round(producao.consumohr)}
                </td>
              ))
          )}
        </tr>

        <tr>
          <td
            colSpan={dateDistinct.length + 2}
            className="bg-gray-200 py-1"
          ></td>
        </tr>

        <tr>
          <td rowSpan={3} className="text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-gray-500 font-bold text-3xl">C</span>
              <span className="text-gray-500 text-xs">
                {producaoTurno3
                  .map((producao: any) => producao.horini)
                  .filter(
                    (value: any, index: any, array: any) =>
                      array.indexOf(value) === index
                  )}
              </span>
              <span className="text-gray-500 text-xs">
                {producaoTurno3
                  .map((producao: any) => producao.horfin)
                  .filter(
                    (value: any, index: any, array: any) =>
                      array.indexOf(value) === index
                  )}
              </span>
            </div>
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. cx
          </td>
          {dateDistinct.map((dt: any) =>
            producaoTurno3
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  {Math.round(producao.consumocx)} (
                  {Math.round(producao.percMeta)}%)
                </td>
              ))
          )}
        </tr>
        <tr className="bg-yellow-50">
          <td className="text-left text-gray-700 font-normal pl-1">
            Cons. Hr
          </td>
          {dateDistinct.map((dt: any) =>
            producaoTurno3
              .filter((val: any) => dateToInt(val.data) === dateToInt(dt))
              .map((producao: any, idx:number) => (
                <td key={idx} className="text-left">
                  {Math.round(producao.consumohr)}
                </td>
              ))
          )}
        </tr>
      </table>
    </div>

    <div className="bg-white my-4 rounded-md p-2 relative overflow-auto">
      <table className="w-full text-gray-700 ">
        <thead>
          <tr className="bg-slate-200">
            <th>
              <div className="!w-24 mx-auto">Turnos</div>
            </th>
            <th>
              <div className="!w-24 text-center mx-auto">Meta diária</div>
            </th>
            <th>
              <div className="!w-24 text-center mx-auto">
                Meta período
              </div>
            </th>
            <th>
              <div className="!w-32 text-center mx-auto">
                Consumo período
              </div>
            </th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-500 font-bold text-3xl">
                  A
                </span>
                <span className="text-gray-500 text-xs">
                  02:18
                  {/* {producaoTurno1.map((producao: any) => (producao.horini)).filter((value: any, index: any, array: any) => array.indexOf(value) === index)} */}
                </span>
                <span className="text-gray-500 text-xs">
                  {producaoTurno1
                    .map((producao: any) => producao.horfin)
                    .filter(
                      (value: any, index: any, array: any) =>
                        array.indexOf(value) === index
                    )}
                </span>
              </div>
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t1: any) => t1.turno === 1)
                .map((turno: any) => turno.metaDiaria)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t1: any) => t1.turno === 1)
                .map((turno: any) => turno.metacx)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t1: any) => t1.turno === 1)
                .map((turno: any) => Math.round(turno.consumocx))}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t1: any) => t1.turno === 1)
                .map((turno: any) => Math.round(turno.percMeta))}
              %
            </td>
          </tr>
          <tr>
            <td colSpan={6} className="bg-gray-200 py-1"></td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-500 font-bold text-3xl">
                  B
                </span>
                <span className="text-gray-500 text-xs">
                  {producaoTurno2
                    .map((producao: any) => producao.horini)
                    .filter(
                      (value: any, index: any, array: any) =>
                        array.indexOf(value) === index
                    )}
                </span>
                <span className="text-gray-500 text-xs">
                  {producaoTurno2
                    .map((producao: any) => producao.horfin)
                    .filter(
                      (value: any, index: any, array: any) =>
                        array.indexOf(value) === index
                    )}
                </span>
              </div>
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t2: any) => t2.turno === 2)
                .map((turno: any) => turno.metaDiaria)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t2: any) => t2.turno === 2)
                .map((turno: any) => turno.metacx)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t2: any) => t2.turno === 2)
                .map((turno: any) => Math.round(turno.consumocx))}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t2: any) => t2.turno === 2)
                .map((turno: any) => Math.round(turno.percMeta))}
              %
            </td>
          </tr>
          <tr>
            <td colSpan={6} className="bg-gray-200 py-1"></td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-500 font-bold text-3xl">
                  C
                </span>
                <span className="text-gray-500 text-xs">
                  {producaoTurno3
                    .map((producao: any) => producao.horini)
                    .filter(
                      (value: any, index: any, array: any) =>
                        array.indexOf(value) === index
                    )}
                </span>
                <span className="text-gray-500 text-xs">
                  {producaoTurno3
                    .map((producao: any) => producao.horfin)
                    .filter(
                      (value: any, index: any, array: any) =>
                        array.indexOf(value) === index
                    )}
                </span>
              </div>
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t3: any) => t3.turno === 3)
                .map((turno: any) => turno.metaDiaria)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t3: any) => t3.turno === 3)
                .map((turno: any) => turno.metacx)}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t3: any) => t3.turno === 3)
                .map((turno: any) => Math.round(turno.consumocx))}
            </td>
            <td className="text-center">
              {producaoTurnos
                .filter((t3: any) => t3.turno === 3)
                .map((turno: any) => Math.round(turno.percMeta))}
              %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default NLoaderIndustria;
