'use client'

import React from 'react';
import { Card,CardContent,CardHeader,CardFooter } from '../ui/card';
import Header from './header';
import { Social } from './social';
import BackButton from './BackButton';
interface CardWrapperProps {
    children:React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;

}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}:CardWrapperProps) => {
  return (
    
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent >

        {children}
        </CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper