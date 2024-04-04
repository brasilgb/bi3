'use client'
import React from 'react'
import Profile from "../profile"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {}

const Header = (props: Props) => {
    const pathname = usePathname();
    const sizeimage = (url: any) => {
        switch (url) {
            case '/': return 200;
            case '/lojas': return 200;
            case '/naturovos': return 200;
        }
    }

    return (
        <header className={`${pathname === '/' ? 'bg-solar-blue-light' : pathname === '/solar' ? 'bg-solar-blue-dark' : 'bg-solar-yellow-200'} px-2`}>
            <div className="container py-1 h-16 mx-auto">
                <div className="flex items-center justify-between h-full">
                    <div className={`flex items-center h-full ${pathname === '/' ? 'w-36' : pathname === '/solar' ? 'w-32' : 'w-24'} p-0.5`}>
                        <Link
                            href="/"
                        >
                            <Image layout="responsive" src={`/logo/${pathname === '/' ? 'logo_grupo.png' : pathname === '/solar' ? 'logo_solar.png' : 'logo_naturovos.png'}`} width={120} height={40} alt={""} />
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