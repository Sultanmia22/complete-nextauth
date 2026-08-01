import AuthLoginBanner from '@/components/Login/AuthLoginBanner'
import LoginForm from '@/components/Login/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <section>
        <AuthLoginBanner />
      </section>
      <section>
        <LoginForm />
      </section>
    </div>
  )
}

export default LoginPage