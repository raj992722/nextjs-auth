"use server"
import * as z from 'zod';

import { RegisterSchema } from '@/schemas';

import { db } from '@/lib/db';
import bcryptjs from 'bcryptjs'


export const register=async(values:z.infer<typeof RegisterSchema>)=>{
    const validatedfields=RegisterSchema.safeParse(values);
    if(!validatedfields.success){
        return {error:"Invalid fields"}
    }

    const {name,email,password}=validatedfields.data;

    const existingUser=await db.user.findUnique({
        where:{
            email,
        }
    })
    if(existingUser){
        return {error:"Email already in use"}
    }

    const hashedPassword=await bcryptjs.hash(password,10);

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    
    console.log(values);
    return {success:"User created"}
}