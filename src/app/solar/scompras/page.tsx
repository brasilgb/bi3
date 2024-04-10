
'use client'
import ButtonAnalise from "@/components/ButtonAnalise";
import MainMenu from "@/components/MainMenu";
import SubBarTop from "@/components/SubBarTop";
import React, { useState } from 'react'
import SCompDiario from "./scompdiario";
import SComPerformance from "./scomperformance";
import SComPerformanceAss from "./scomperformanceass";
import SComPerformanceMes from "./scomperformancemes";

type Props = {}

const SCompras = (props: Props) => {
    const [analise, setAnalise] = useState<string>('compdiario');

    return (
        <main>
            <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
            <div className="container m-auto md:px-0 px-2">
                <MainMenu />
            </div>
            <div className='container m-auto'>

                <div className='bg-white p-2 mt-2 rounded-md shadow-sm'>
                    <div className='flex items-center justify-start gap-2 md:gap-4 overflow-x-auto'>
                        <ButtonAnalise title={'Comp. diário'} onclick={() => setAnalise('compdiario')} active={analise} />
                        <ButtonAnalise title={'Performance'} onclick={() => setAnalise('performance')} active={analise} />
                        <ButtonAnalise title={'Perform. Assoc.'} onclick={() => setAnalise('performassoc')} active={analise} />
                        <ButtonAnalise title={'Perform. Mês'} onclick={() => setAnalise('performmes')} active={analise} />
                    </div>
                    <div className="mt-2">
                        {analise === "compdiario" &&
                            <SCompDiario />
                        }
                        {analise === "performance" &&
                            <SComPerformance />
                        }
                        {analise === "performassoc" &&
                            <SComPerformanceAss />
                        }
                        {analise === "performmes" &&
                            <SComPerformanceMes />
                        }
                    </div>
                </div>

            </div>
        </main>
    )
}

export default SCompras