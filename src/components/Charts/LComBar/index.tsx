import React, { Fragment, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: any;
};

const LComBar = ({ data }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const colors = Highcharts.getOptions().colors;
  const diasemana = data.map((value: any) => value.DiaSemana);
  const compras = data.map((value: any) => value.Compras);
  const semanames = data.map((value: any) => value.SemanaMes);

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
      text: 'Gráfico de Evolução de Compras',
      align: 'left',
    },
    xAxis: [
      {
        categories: diasemana,
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
        gridLineWidth: 0,
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
        gridLineWidth: 0,
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
        name: 'Compras',
        type: 'column',
        yAxis: 1,
        data: compras,
        color: '#00BFFF',
        tooltip: {
          valuePrefix: 'R$ ',
          valueDecimals: 2,
          shared: true,
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

export default LComBar;
