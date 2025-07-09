import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthContext } from "@/contexts/AuthContext"
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover"
import { Calendar } from "lucide-react"
import { Cross2Icon } from "@radix-ui/react-icons";

export function SetNumMonth() {
    const { monthSelected, setMonthSelected } = useAuthContext();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="destructive" size="icon" className="w-8 h-8 bg-solar-wine-support">
                    <Calendar />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 ml-1">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium md:text-base text-sm">Análise por meses</h4>
                        <p className="text-muted-foreground md:text-sm text-xs">
                            Digite o número de meses para gerar análise.
                        </p>
                    </div>
                    <form>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="mes">N° de Meses</Label>
                                <Input
                                    id="mes"
                                    type="number"
                                    defaultValue={monthSelected}
                                    className="col-span-2 h-8"
                                    onChange={(e: any) => setMonthSelected(e.target.value)}
                                />
                            </div>

                        </div>
                    </form>
                </div>
                <PopoverClose className="flex items-center justify-center h-6 w-6 rounded-full text-solar-blue-secundary bg-gray-100 absolute top-1 right-1 hover:bg-solar-blue-primary hover:text-white focus:shadow-md" aria-label="Close">
                    <Cross2Icon />
                </PopoverClose>
                <PopoverArrow className="fill-slate-400" />
            </PopoverContent>
        </Popover>
    )
}
