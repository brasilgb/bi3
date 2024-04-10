'use client'
import ButtonAnalise from "@/components/ButtonAnalise";
import MainMenu from "@/components/MainMenu";
import SubBarTop from "@/components/SubBarTop";
import React, { useState } from 'react'
import Vencidos from "./vencidos";

type Props = {}

const SInadimplencia = (props: Props) => {
    const [analise, setAnalise] = useState<string>('vencidos');
    
    return (
        <main>
            <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
            <div className="container m-auto md:px-0 px-2">
                <MainMenu />
            </div>
            <div className='container m-auto'>

                <div className='bg-white p-2 mt-2 rounded-md shadow-sm'>
                    <div className='flex items-center justify-start gap-2 md:gap-4 overflow-x-auto'>
                        <ButtonAnalise title={'Vencidos'} onclick={() => setAnalise('vencidos')} active={analise} />
                    </div>
                    <div className="mt-2">
                        {analise === "vencidos" &&
                            <Vencidos />
                        }
                    </div>
                </div>

            </div>
        </main>
  )
}

export default SInadimplencia