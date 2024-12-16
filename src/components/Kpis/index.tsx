import React, { Fragment } from 'react';
import { IconContext } from "react-icons";
import { IoTime } from "react-icons/io5";

interface KpiProps {
  icon: any;
  title: string;
  value: string;
  valuerep?: string;
  titlerep?: string;
  textcolor: string;
  bgcolor: string;
  iconcolor: string;
}

export const Kpi = (props: KpiProps) => {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-sm w-full relative">
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 flex-col items-start justify-between">
          <div className="md:text-base text-[10px] text-gray-400 ">
            {props.title}
          </div>
          <div className={`md:text-2xl text-sm font-bold ${props.textcolor}`}>
            {props.value}
          </div>
        </div>
        <div
          className={`flex items-center justify-center md:text-4xl text-xl ${props.iconcolor} absolute top-2 right-2`}
        >
          {props.icon}
        </div>
      </div>
      {props.valuerep && (
        <div className="px-4 py-2 border-t border-gray-100 flex items-center">
          <div className="md:text-sm text-xs text-gray-400 flex-1">
            {props.titlerep}
          </div>
          <span
            className={`md:text-xl text-xs font-extrabold ${props.textcolor}  ${props.bgcolor}`}
          >
            {props.valuerep}%
          </span>
        </div>
      )}
    </div>
  );
};

interface KpiNaturProps {
  title: string;
  value: string;
  valColor?: any;
  titleColor?: string;
  rotulo?: string;
  padding?: string;
  valorStyle?: string;
  titleStyle?: string;
  rotuloStyle?: string;
  kpiStyle?: string;
  realTime?: any;
}

export const KpiNatur = (props: KpiNaturProps) => {
  return (
    <Fragment>
      <div className="relative">
        <div
          className={`${props.kpiStyle} flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-md py-6`}
        >
          {props.realTime && (
            <div className="absolute top-2 left-2">
              <IconContext.Provider
                value={{ className: 'text-gray-500 cursor-pointer text-xl' }}
              >
                <div>
                  <IoTime title="Dados carregados a cada 10 min" />
                </div>
              </IconContext.Provider>
            </div>
          )}
          <div className="">
            <h1 className={`${props.titleStyle} pb-2`}>{props.title}</h1>
          </div>
          <div className="">
            <h1
              className={`${props.rotuloStyle} drop-shadow-md font-semibold text-base md:text-xl text-gray-500`}
            >
              {props.rotulo}
            </h1>
          </div>
          <div className="">
            <h1
              className={`${props.valorStyle} drop-shadow-md font-semibold text-base md:text-3xl`}
            >
              {props.value}
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
