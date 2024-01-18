"use client"
import * as z from 'zod'
import { RegisterSchema } from '@/schemas';
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
import { register } from '@/actions/register';
const LoginForm = () => {
  const [ispending,startTransition]=useTransition();
  const [error,setError]=useState<string | undefined>('');
  const [success,setSuccess]=useState<string | undefined>('');
  const form =useForm<z.infer<typeof RegisterSchema>>({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:""
    }
  })
  const onSubmit=(values:z.infer<typeof RegisterSchema>)=>{
    setError('');
    setSuccess('');
    
    startTransition(()=>{

      register(values).then(data=>{
        setError(data.error);
        setSuccess(data.success);
      });
    })
  }
  return (
    <CardWrapper 
    headerLabel='Welcome'
    backButtonHref='/auth/login'
    backButtonLabel="Already have an account?"
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

<FormField 
              control={form.control}
                name='name'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                      {...field}
                      disabled={ispending}
                      type='text'
                      placeholder='John doe'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type='submit' className='w-full' disabled={ispending}>Create an account</Button>
        </form>
      </Form>
    </CardWrapper>
  )  
}

export default LoginForm;