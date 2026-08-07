"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Button } from '../ui/button';
import { googleSignInAction } from '@/actions/auth-actions';

const SocialLogin = () => {

  return (
    <div>
        <Button onClick={() => googleSignInAction()} className="w-full flex items-center justify-center gap-2 border  focus:outline-none focus:ring-2 focus:ring-offset-1  transition-colors duration-200"> 
            <FcGoogle /> Sign in with Google
        </Button>
    </div>
  )
}

export default SocialLogin