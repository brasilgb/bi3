import { ReactNode } from "react"

interface TableProps {
    children: ReactNode
    classname?: string;
    colspan?: number;
    onclick?: any;
}

export const BTable = (props: TableProps) => {
    return (
        <table className={`md:table-auto w-full ${props.classname}`}>
            {props.children}
        </table>
    )
}

export const BTr = (props: TableProps) => {
    return (
        <tr onClick={props.onclick} className={`${props.classname} py-0.5 border-b border-b-gray-200`}>
            {props.children}
        </tr>
    )
}

export const BTh = (props: TableProps) => {
    return (
        <th className={`font-medium text-left px-2 py-0.5 whitespace-nowrap ${props.classname}`}>
            {props.children}
        </th>
    )
}

export const BTd = (props: TableProps) => {
    return (
        <td colSpan={props.colspan} className={`px-2 py-0.5 whitespace-nowrap ${props.classname}`}>
            {props.children}
        </td>
    )
}