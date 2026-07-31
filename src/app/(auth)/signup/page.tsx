import React from 'react'
import RegisterForm from '@/components/Register/RegisterForm'
import AuthRegisterBanner from '@/components/Register/AuthRegisterBanner'

const RegisterPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
     <section>
      <AuthRegisterBanner />
     </section>
     <section>
      <RegisterForm />
     </section>
    </div>
  )
}

export default RegisterPage