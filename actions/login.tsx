"use server"
import * as z from 'zod';

import { LoginSchema } from '@/schemas';
// import { signIn } from 'next-auth/react';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

import { findUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';


export const login=async(values:z.infer<typeof LoginSchema>)=>{
    const validatedfields=LoginSchema.safeParse(values);
    if(!validatedfields.success){
        return {error:"Invalid fields"}
    }
    const {email,password}=validatedfields.data;
    const existingUser=await findUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error:"Email does not exist"};
    }

    if(!existingUser.emailVerified){
        const verificationToken=await generateVerificationToken(existingUser.email);
        return {success:"Confirmation email sent"};
    }

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid credentials"};
                default:
                    return {error:"Something went wrong!"}
            }
        }
        throw error;
    }
    
   
}