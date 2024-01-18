import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import exp from "constants";

const fonts=Poppins({
    subsets:['latin'],
    weight:['600'],
})

interface HeaderProps {
    label:string,
}

const Header=({label}:HeaderProps)=>{
    return(
        <div className="flex flex-col items-center justify-center gap-y-4 w-full">
                <h1 className={cn("text-3xl font-semibold",fonts.className)}>
                    Auth
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {label}
                    </p>
        </div>
    )
}

export default Header;