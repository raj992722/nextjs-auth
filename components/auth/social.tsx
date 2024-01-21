'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import {signIn} from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social=()=>{
    const onclick=(provider:"google" | "github")=>{
        signIn(provider,{
            callbackUrl:DEFAULT_LOGIN_REDIRECT,
        })

    }

    return (
        <div className="w-full flex items-center justify-center gap-x-2">
            <Button className="w-full " variant={'outline'} size={'lg'} 
            onClick={()=>onclick("google")}
            >
                <FcGoogle className="w-5 h-5"/>
            </Button>
            <Button className="w-full " variant={'outline'} size={'lg'} 
            onClick={()=>onclick('github')}
            >
                <FaGithub className="w-5 h-5"/>
            </Button>
        </div>
    )
}