"use server"
import * as z from 'zod';

import { LoginSchema } from '@/schemas';


export const login=async(values:z.infer<typeof LoginSchema>)=>{
    const validatedfields=LoginSchema.safeParse(values);
    if(!validatedfields.success){
        return {error:"Invalid fields"}
    }
    
    console.log(values);
    return {success:"email sent"}
}