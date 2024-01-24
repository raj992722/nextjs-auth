"use client"
import * as z from 'zod'
import { LoginSchema } from '@/schemas';
import React from 'react';

import {FormControl,Form,FormField,FormLabel,FormMessage,FormItem,FormDescription} from "@/components/ui/form";
import  {useForm}  from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardWrapper from './CardWrapper';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useState,useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
const LoginForm = () => {

  const searchParams=useSearchParams();
  const urlError=searchParams.get('error') ? "Email already in use with other provider":"";
  const [ispending,startTransition]=useTransition();
  const [error,setError]=useState<string | undefined>('');
  const [success,setSuccess]=useState<string | undefined>('');
  const form =useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
    setError('');
    setSuccess('');
    
    startTransition(()=>{

      login(values).then(data=>{
        setError(data?.error);
        setSuccess(data?.success);
      });
    })
  }
  return (
    <CardWrapper 
    headerLabel='Welcome back'
    backButtonHref='/auth/register'
    backButtonLabel="Don't have an account"
    showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
              <FormField 
              control={form.control}
              name='email'
              render={({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    disabled={ispending}
                    placeholder='johndoe@example.com'
                    type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              
              />

              <FormField 
              control={form.control}
                name='password'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                      {...field}
                      disabled={ispending}
                      type='password'
                      placeholder='*****'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success}/>
          <Button type='submit' className='w-full' disabled={ispending}>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )  
}

export default LoginForm;