import Progress from "@/components/Charts/Progress"
import { Kpi } from "@/components/Kpis"
import MainMenu from "@/components/MainMenu"
import SubBarTop from "@/components/SubBarTop"
import React from 'react'
import { AiOutlineLineChart } from "react-icons/ai"
import { FaBoxes } from "react-icons/fa"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { GiPayMoney } from "react-icons/gi"
import { MdMoneyOff } from "react-icons/md"
import { PiChartLineDown } from "react-icons/pi"
import { TbChartHistogram } from "react-icons/tb"

type Props = {}

const Solar = (props: Props) => {

  return (
    <main className="">
      <SubBarTop colors="border-gray-200 text-gray-500" back="/" forwards="" />
      <div className="container m-auto md:px-0 px-2">
      <MainMenu />
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-4">
          <Kpi icon={<GiPayMoney />} title={"Vendas (mês)"} value={"R$ 898.824,20"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-green"} />
          <Kpi icon={<GiPayMoney />} title={"Vendas (dia)"} value={"R$ 140.948,03"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-green"} />
          <Kpi icon={<AiOutlineLineChart />} title={"Meta"} value={"R$ 12.000.000.00"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-yellow-200"} />
          <Kpi icon={<FaMoneyBillTrendUp />} title={"Faturamento"} value={"R$ 882.670,07"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-blue-dark"} />
        </div>
        <div className="grid grid-cols-3 md:gap-4 gap-2 md:mt-4 mt-2">
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress title="Meta" value={"80"} colorBar="#019EE3" colorText="#019EE3" />
          </div>
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress title="Margem" value={"60"} colorBar="#F99F1E" colorText="#F99F1E" />
          </div>
          <div className="p-0.5 bg-white rounded-md shadow-sm">
            <Progress title="Projeção" value={"40"} colorBar="#A7C414" colorText="#A7C414" />
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2 md:mt-4 mt-2">
          <Kpi icon={<PiChartLineDown />} title={"Vencidos (15 > venc <= 180)"} value={"R$ 898.824,20"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-green"} valuerep="5.55" titlerep="Representa" />
          <Kpi icon={<MdMoneyOff />} title={"Perdas efetivas ( venc > 180)"} value={"R$ 140.948,03"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-green"} valuerep="5.32" titlerep="Representa" />
          <Kpi icon={<TbChartHistogram />} title={"JURO (MÊS)"} value={"R$ 12.000.000.00"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-yellow-200"} valuerep="5.74" titlerep="Representa" />
          <Kpi icon={<FaBoxes />} title={"ESTOQUE ATUAL"} value={"R$ 882.670,07"} textcolor={"text-solar-blue-light"} bgcolor={""} iconcolor={"text-solar-blue-dark"} valuerep="100.15" titlerep="Representa" />
        </div>
      </div>

    </main>
  )
}

export default Solar