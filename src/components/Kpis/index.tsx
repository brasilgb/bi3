import React from 'react';

interface KpiTesteProps {
  icon: any;
  title: string;
  value: string;
  valuerep?: string;
  titlerep?: string;
  textcolor: string;
  bgcolor: string;
  iconcolor: string;
}

export const Kpi = (props: KpiTesteProps) => {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-sm">
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
          className={`flex items-center justify-center md:text-4xl text-xl ${props.iconcolor}`}
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
