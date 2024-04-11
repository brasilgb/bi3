'use client'
import ButtonAnalise from "@/components/ButtonAnalise"
import MainMenu from "@/components/MainMenu"
import SubBarTop from "@/components/SubBarTop"
import React, { useState } from 'react'
import SProduto from "./sproduto"
import SInstituicao from "./sinstituicao"
import STInstituicao from "./stinstituicao"
import STProduto from "./stproduto"

const SEmprestimos = () => {
    const [analise, setAnalise] = useState<string>('instituicao');
    
  return (
    <main>
            <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
            <div className="container m-auto md:px-0 px-2">
                <MainMenu />
            </div>
            <div className='container m-auto'>

                <div className='bg-white p-2 mt-2 rounded-md shadow-sm'>
                    <div className='flex items-center justify-start gap-2 md:gap-4 overflow-x-auto'>
                        <ButtonAnalise title={'Instituição'} onclick={() => setAnalise('instituicao')} active={analise} />
                        <ButtonAnalise title={'Produto'} onclick={() => setAnalise('produto')} active={analise} />
                        <ButtonAnalise title={'Tot. instituição'} onclick={() => setAnalise('totinstituicao')} active={analise} />
                        <ButtonAnalise title={'Tot. produto'} onclick={() => setAnalise('totproduto')} active={analise} />
                    </div>
                    <div className="mt-2">
                        {analise === "instituicao" &&
                            <SInstituicao/>
                        }
                        {analise === "produto" &&
                            <SProduto />
                        }
                        {analise === "totinstituicao" &&
                            <STInstituicao />
                        }
                        {analise === "totproduto" &&
                            <STProduto />
                        }
                    </div>
                </div>

            </div>
        </main>
  )
}

export default SEmprestimos