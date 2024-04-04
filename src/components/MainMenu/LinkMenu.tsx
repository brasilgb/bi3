'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import React from 'react'
interface LinkMenuProps {
    title?: string;
    url: string;
    icon?: any;
}

const LinkMenu = (props: LinkMenuProps) => {
    const pathname = usePathname();

    return (
        <li className={``}>
            <Link
                className={`flex items-center justify-center ${!props.title ? 'w-8' : 'md:w-32 w-28 '} py-1 rounded md:text-sm text-[10px] text-center font-medium uppercase drop-shadow-sm border hover:bg-solar-green hover:text-white duration-300 ${pathname === props.url ? 'bg-solar-green border-white text-white' : 'border-solar-green text-gray-500'}`}
                href={props.url}
            >
                <span className="md:text-xl text-[16px]">{props.icon}</span>
                <span>{props.title}</span>
            </Link>
        </li>
    )
}

export default LinkMenu