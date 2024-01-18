'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social=()=>{
    return (
        <div className="w-full flex items-center justify-center gap-x-2">
            <Button className="w-full " variant={'outline'} size={'lg'} >
                <FcGoogle className="w-5 h-5"/>
            </Button>
            <Button className="w-full " variant={'outline'} size={'lg'} >
                <FaGithub className="w-5 h-5"/>
            </Button>
        </div>
    )
}