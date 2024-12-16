import React, { ReactNode } from 'react'

type KpiContainerProps = {
    children: ReactNode;
    cols?: string;
}

const KpiContainer = ({ children, cols }: KpiContainerProps) => {
    return (
        <div className="grid md:grid-cols-6 grid-cols-2 md:gap-4 gap-2 mt-4">
            {children}
        </div>
    )
}

export default KpiContainer