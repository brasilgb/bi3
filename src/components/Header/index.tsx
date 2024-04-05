'use client'
import React from 'react'
import Profile from "../profile"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Props = {}

const Header = (props: Props) => {
    const searchParams = useSearchParams()
    const setor = searchParams.get('setor')

    return (
        <header className={`${setor === 'loja' ? 'bg-solar-blue-dark' : setor === 'naturovos' ? 'bg-solar-yellow-200' : 'bg-solar-blue-light'} px-2`}>
            <div className="container py-1 h-16 mx-auto">
                <div className="flex items-center justify-between h-full">
                    <div className={`flex items-center h-full ${setor === 'loja' ? 'w-32' : setor === 'naturovos' ? 'w-24' : 'w-36'} p-0.5`}>
                        <Link
                            href="/"
                        >
                            <Image layout="responsive" src={`/logo/${setor === 'lojas' ? 'logo_solar.png' : setor === 'naturovos' ? 'logo_naturovos.png' : 'logo_grupo.png'}`} width={120} height={40} alt={""} />
                        </Link>
                    </div>
                    <div>
                        <Profile />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header