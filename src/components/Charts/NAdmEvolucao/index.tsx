import React, { Fragment, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: any;
  totais: any;
};

const NAdmEvolucao = ({ data, totais }: Props) => {
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
  const dia = data.map((value: any) => value.Dia);
  const MesAtual = data.map((value: any) => value.MesAtual);
  const MesAnterior = data.map((value: any) => value.MesAnterior);
  const AnoMesAtual = data.map((value: any) => value.AnoMesAtual);

  Highcharts.setOptions({
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  });

  const options = {
    chart: {
      marginRight: 0,
      inverted: width > 640 ? false : true,
    },
    title: {
      text: totais.map((t: any) => t.TituloGrafico),
      align: 'left',
    },
    // subtitle: {
    //     text: 'Fonte: Grupo Solar - Lojas',
    //     align: 'left'
    // },
    xAxis: [
      {
        categories: dia,
        crosshair: true,
      },
    ],
    plotOptions: {
      series: {
        maxPointWidth: 50,
      },
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}%',
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
          format: '{value}%',
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
        name: totais.map((t: any) => t.RotuloGrafMesAnoAtual),
        type: 'spline',
        yAxis: 1,
        data: MesAtual,
        color: '#00BFFF',
        tooltip: {
          valuePrefix: 'R$ ',
          valueDecimals: 2,
          shared: true,
        },
      },
      {
        name: totais.map((t: any) => t.RotuloGrafMesAnterAnoAtual),
        type: 'spline',
        yAxis: 1,
        data: MesAnterior,
        color: '#F99F1E',
        marker: {
          enabled: true,
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%',
        },
      },
      {
        name: totais.map((t: any) => t.RotuloGrafAnoAnter),
        type: 'spline',
        yAxis: 1,
        data: AnoMesAtual,
        color: '#f9371e',
        marker: {
          enabled: true,
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%',
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

export default NAdmEvolucao;
