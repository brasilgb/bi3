
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import { SetNumMonth } from "./SetNumMonth"
import { formatMoney } from "@/utils"

export default function CardData({ vendas, vencido, percVencidos, tipo, meses, lastid, lengthid }: { vendas: any, vencido: number, percVencidos: number, tipo: string, meses: number, lastid: number, lengthid: number }) {
    return (
        <Card className="shadow-sm border border-gray-50 rounded-md">
            <CardHeader>
                <CardDescription>Análise por {tipo === 'F' ? 'filial' : 'grupo'} dos últimos <span className="font-bold text-gray-900">{meses}</span> meses</CardDescription>
                <CardTitle className="font-semibold flex items-center justify-between gap-2">
                    <span className="md:md:text-sm text-xs text-xs text-gray-500">Vendas</span>
                    <Badge variant="outline" className="md:text-lg text-base text-blue-600">
                        {formatMoney(vendas)}
                    </Badge>
                </CardTitle>
                <div className="font-semibold flex items-center justify-between gap-2">
                    <span className="md:text-sm text-xs text-gray-500">Vencido</span>
                    <Badge variant="outline" className={`md:text-lg text-base ${percVencidos > 0 ? 'text-red-600' : 'text-green-500'} `}>
                        {formatMoney(vencido)}
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex items-start justify-between gap-1.5 md:text-sm text-xs">
                <div>
                    {lastid + 1 === lengthid ? <SetNumMonth /> : ''}
                </div>
                <div>
                    <div className="md:text-sm text-xs text-gray-500">Valores vencidos, representam:</div>
                    <div className="flex items-center justify-between gap-2 w-full">
                        <span className="md:text-sm text-xs">{percVencidos > 0 ? <TrendingUp className="md:size-8 text-red-500" /> : <TrendingDown className="md:size-8 text-green-500" />}</span>
                        <span className="md:text-3xl text-2xl font-bold text-red-500">{percVencidos} %</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
