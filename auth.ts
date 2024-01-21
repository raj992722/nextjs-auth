import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

// import {UserRole} from "@prisma/client"

import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { findUserByEmail, findUserById } from "./data/user";



export const { handlers:{GET,POST}, auth ,signIn,signOut} = NextAuth({
  
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  }
  ,events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      })
    }
  }
  
  
  ,callbacks:{

    async signIn({user}){
      console.log({user});
      const existingUser=await findUserById(user.id);

      if(!existingUser || !existingUser.emailVerified) return false;


      return true
    },
   
    async session({token,session}){
      // console.log({sessionToken:token})
      if(token.sub && session.user){
        session.user.id=token.sub;
      }

      if(token.role && session.user){
        session.user.role=token.role;
      }

      return session;
    },
    async jwt({token,}){
      if(!token.sub) return token;
      const existingUser= await findUserById(token.sub);
    if(!existingUser) return token;
    token.role=existingUser.role; 

     
      return token;
    },
  },
  
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})