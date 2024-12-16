import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const DonutChart = ({ data, periodo }) => {

    const options = {

        chart: {
            type: 'pie',
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            useHTML: true,
            text: `<span class="sm:text-lg text-xs text-gray-500">% Representatividade por meio de pagamento</span>`
        },
        subtitle: {
            useHTML: true,
            // text: `<span class="text-gray-400 text-xl"><b>${periodo}</b></span>`,
            // floating: true,
            // verticalAlign: 'middle',
            // horizontalAlign: 'center',
            // y: 30
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                size:200
            },
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 8,
                dataLabels: [{
                    enabled: true,
                    distance: 20,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: -15,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '0.9em'
                    }
                }],
                showInLegend: true
            }
        },
        series: [{
            name: 'Registrations',
            colorByPoint: true,
            innerSize: '75%',
            data: [
                {
                    name: data[0]?.MeioPagamento,
                    y: data[0]?.VendasTotal * 100
                },
                {
                    name: data[1]?.MeioPagamento,
                    y: data[1]?.VendasTotal * 100
                },
                {
                    name: data[2]?.MeioPagamento,
                    y: data[2]?.VendasTotal * 100
                },
                {
                    name: data[3]?.MeioPagamento,
                    y: data[3]?.VendasTotal * 100
                },
                {
                    name: data[4]?.MeioPagamento,
                    y: data[4]?.VendasTotal * 100
                },
                {
                    name: data[5]?.MeioPagamento,
                    y: data[5]?.VendasTotal * 100
                },
                {
                    name: data[6]?.MeioPagamento,
                    y: data[6]?.VendasTotal * 100
                },
            ]
        }]
    };
    return (
        <div className='relative h-[300px]'>
            <HighchartsReact
            containerProps={{ style: { width: '100%', height: '100%' } }}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default DonutChart;