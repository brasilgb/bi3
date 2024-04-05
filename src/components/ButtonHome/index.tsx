'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'

interface ButtonHomeProps {
    bgbutton: string;
    logobutton: string;
    colorbutton: string;
    width?: number;
    url: string;
    setor: string;
}
const ButtonHome = (props: ButtonHomeProps) => {
    const pathname = usePathname();
    return (
        <div className={`${props.bgbutton} h-24 w-full rounded-md shadow-md border-2 border-white flex items-center justify-center`}>
            <Link
                className="w-full h-full flex items-center justify-center"
                href={{
                    pathname: `${props.url}`,
                    query: { setor: `${props.setor}` },
                }}
            >
                <div
                    className={`${props.colorbutton} ${props.logobutton === 'logo_solar.png' ? 'w-36' : 'w-28'}`}
                >
                    <Image layout="responsive" src={`/logo/${props.logobutton}`} width={120} height={45} alt="" />
                </div>
            </Link>
        </div>
    )
}

export default ButtonHome