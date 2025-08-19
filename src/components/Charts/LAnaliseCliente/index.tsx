import React, { Fragment, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'moment/locale/pt-br'
import moment from 'moment';

type Props = {
  data: any;
};

const LAnaliseCliente = ({ data }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const colors = Highcharts.getOptions().colors;

  const mes = data?.map((value: any) => value.DataChave.toString().slice(4,6));
  const cliPlano = data?.map((value: any) => value.CodPlano).filter((value: any, index: any, self: any) => self.indexOf(value) === index).sort((a: any, b: any) => (a > b ? 1 : -1));
  const cliAtuais = data?.sort((a: any, b: any) => (a.CodPlano > b.CodPlano ? 1 : -1)).filter((fl: any) => (fl.Situacao === 'Atuais')).map((value: any) => value.QtdCliente);
  const cliNovos = data?.sort((a: any, b: any) => (a.CodPlano > b.CodPlano ? 1 : -1)).filter((fl: any) => (fl.Situacao === 'Novos')).map((value: any) => value.QtdCliente);
  const cliRecuperados = data?.sort((a: any, b: any) => (a.CodPlano > b.CodPlano ? 1 : -1)).filter((fl: any) => (fl.Situacao === 'Recuperados')).map((value: any) => value.QtdCliente);

  const AnoMesAtual = data.sort((a: any, b: any) => (a.AnoMesAtual > b.AnoMesAtual ? 1 : -1)).map((value: any) => value.AnoMesAtual);

  Highcharts.setOptions({
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  });
  const options = {
    chart: {
      // marginRight: 1,
      inverted: width > 640 ? false : true,
      height: width > 640 ? '400px' : '500px',
    },
    title: {
      useHTML: true,
      text: `<h1 class="sm:text-sm text-[9px] text-gray-500 w-full">Análise Quantidade Cliente por Situação e Tipo de Movimento <span class="uppercase">(${moment(mes[0]).format('MMM')}</span>)</h1>`,
      align: 'left',
    },
    // subtitle: {
    //     text: 'Fonte: Grupo Solar - Lojas',
    //     align: 'left'
    // },
    xAxis: [
      {
        categories: cliPlano,
        crosshair: true,
      },
    ],
    plotOptions: {
      dataLabels: {
        enabled: true
      },
      line: {
        enableMouseTracking: false
      },
      series: {
        maxPointWidth: 50,
      },
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 1,
        //softMax: 6000,
        title: {
          text: '',
          style: {
            color: '#6e6d6d',
          },
          enabled: false,
        },
        labels: {
          format: '{value}',
          style: {
            color: '#6e6d6d',
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 1,
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        labels: {
          format: '{value}',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'horizontal',
      align: 'left',
      x: 50,
      // verticalAlign: 'top',
      y: 20,
      floating: false,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Atuais',
        type: 'spline',
        yAxis: 1,
        data: cliAtuais,
        color: '#00BFFF',
        tooltip: {
          valuePrefix: '',
          valueDecimals: 0,
          shared: true,
        },
        dataLabels: {
          enabled: true
        },
      },
      {
        name: 'Novos',
        type: 'spline',
        yAxis: 1,
        data: cliNovos,
        color: '#F99F1E',
        marker: {
          enabled: true,
        },
        dataLabels: {
          enabled: true
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 0,
          valueSuffix: '',
        },
      },
      {
        name: 'Recuperados',
        type: 'spline',
        yAxis: 1,
        data: cliRecuperados,
        color: '#f9371e',
        marker: {
          enabled: true,
        },
        dataLabels: {
          enabled: true
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 0,
          valueSuffix: '',
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 0,
            },
            yAxis: [
              {
                labels: {
                  align: 'right',
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                visible: false,
              },
            ],
          },
        },
      ],
    },
  };
  return (
    <Fragment>
      <div id="container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </Fragment>
  );
};

export default LAnaliseCliente;
