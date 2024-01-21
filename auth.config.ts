import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { findUserByEmail } from "./data/user"
import bcrypt from 'bcryptjs';
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

export default {
  providers: [github({
    clientId:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET
  }),
  google({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET
  }),
    Credentials({
      async authorize(credentials){
        const validatedFields=LoginSchema.safeParse(credentials);
        if(validatedFields.success){
          const {email,password}=validatedFields.data;
          const user=await findUserByEmail(email);

          if(!user || !user.password) return null;

          const passwordMatch=await bcrypt.compare(password,user.password);
          if(passwordMatch) return user;

        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig