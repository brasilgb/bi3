import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const DonutChart = ({ data, periodo }) => {
    const alteredData = data?.filter((fl:any) => (fl.VendasTotal > 0)).map((res: any) => ({ name: res.MeioPagamento, y: res.VendasTotal < 0 ? 0 : res.VendasTotal }));
    console.log(alteredData);

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
                size: 200
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
            data: alteredData
            // [
            //     {
            //         name: result[0]?.MeioPagamento,
            //         y: result[0]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[1]?.MeioPagamento,
            //         y: result[1]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[2]?.MeioPagamento,
            //         y: result[2]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[3]?.MeioPagamento,
            //         y: result[3]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[4]?.MeioPagamento,
            //         y: result[4]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[5]?.MeioPagamento,
            //         y: result[5]?.VendasTotal * 100
            //     },
            //     {
            //         name: result[6]?.MeioPagamento,
            //         y: result[6]?.VendasTotal * 100
            //     },
            // ]
        }]
    };
    return (
        <div className='relative h-[300px]'>
            <HighchartsReact
                containerProps={{ style: { width: '100%', height: '100%' } }}
                highcharts={Highcharts}
                options={options}
            />
            <p className='absolute -bottom-1 left-2 text-[10px] text-gray-500'>* O conjunto de dados contém valores negativos ou zerados que não podem ser mostrados</p>
        </div>
    )
}

export default DonutChart;