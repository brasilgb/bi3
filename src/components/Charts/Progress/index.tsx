'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ProgressProps {
  title?: string;
  value?: any;
  sizetitle?: string;
  sizevalue?: string;
  colorBar?: string;
  colorText?: string;
}
const Progress = ({
  title,
  value,
  colorBar,
  colorText,
  sizevalue,
  sizetitle,
}: ProgressProps) => {
  const [sizeWindow, setSizeWindow] = useState(1900);

  useEffect(() => {
    const getSizeWindow = () => {
      setSizeWindow(window.screen.availWidth);
    };
    getSizeWindow();
  }, []);

  const options = {
    chart: {
      type: 'pie',
      height: `${sizeWindow > 1900 ? 180 : 150}`,
    },
    plotOptions: {
        pie: {
            size:`${sizeWindow > 1900 ? '120%' : '140%'}`,
        }
    },
    title: {
      text: '',
    },
    subtitle: {
      text: `<div style='font-size: ${sizeWindow > 1900 ? '22px' : '12px'}; font-weight: bold; color: ${colorText}'>${value}%</div> <span style='font-size: ${sizeWindow > 1900 ? '15px' : '10px'}; font-weight: bold;'>${title}</span>`,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        textAlign: 'center',
      },
      x: 0,
      y: 8,
      useHTML: true,
    },
    series: [
      {
        enableMouseTracking: false,
        innerSize: '75%',
        dataLabels: {
          enabled: false,
        },
        data: [
          {
            y: parseFloat(value),
            color: colorBar,
          },
          {
            y: 100 - parseFloat(value),
            color: '#ddd',
          },
        ],
      },
    ],
  };

  return (
    <Fragment>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </Fragment>
  );
};

export default Progress;
