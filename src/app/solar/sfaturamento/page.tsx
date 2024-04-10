'use client'
import ButtonAnalise from "@/components/ButtonAnalise";
import MainMenu from "@/components/MainMenu";
import SubBarTop from "@/components/SubBarTop";
import React, { useState } from 'react'
import SResdiario from "./sresdiario";
import SPerformance from "./sperformance";
import SPerfAssociacao from "./sperfassociacao";
import SPerfMes from "./sperfmes";

type Props = {}

const SFaturamento = (props: Props) => {
    const [analise, setAnalise] = useState<string>('resumodiario');
    
    return (
        <main>
            <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
            <div className="container m-auto md:px-0 px-2">
                <MainMenu />
            </div>
            <div className='container m-auto'>

                <div className='bg-white p-2 mt-2 rounded-md shadow-sm'>
                    <div className='flex items-center justify-start gap-2 md:gap-4 overflow-x-auto'>
                        <ButtonAnalise title={'Resumo diário'} onclick={() => setAnalise('resumodiario')} active={analise} />
                        <ButtonAnalise title={'Performance'} onclick={() => setAnalise('performance')} active={analise} />
                        <ButtonAnalise title={'Perform. Assoc.'} onclick={() => setAnalise('performassoc')} active={analise} />
                        <ButtonAnalise title={'Perform. Mês'} onclick={() => setAnalise('performmes')} active={analise} />
                    </div>
                    <div className="mt-2">
                        {analise === "resumodiario" &&
                            <SResdiario />
                        }
                        {analise === "performance" &&
                            <SPerformance />
                        }
                        {analise === "performassoc" &&
                            <SPerfAssociacao />
                        }
                        {analise === "performmes" &&
                            <SPerfMes />
                        }
                    </div>
                </div>

            </div>
        </main>
    )
}

export default SFaturamento