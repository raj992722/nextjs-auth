import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./CardWrapper";



export default function ErrorCard(){
    return (
        <CardWrapper
        headerLabel="Oops! something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Go back to login"
        >
            <div className="w-full flex bg-destructive/25 py-2 shadow-sm rounded-lg text-destructive justify-center items-center text-3xl">

        <ExclamationTriangleIcon className="w-10 h-10"/>
            </div>
        </CardWrapper>
    )
}