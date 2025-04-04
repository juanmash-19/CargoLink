'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
// import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchemes } from '@/Schemes/LoginSchemes';

import CustomButton from '@/components/atoms/CustomButton';

import { standarInput, standarTextLink, standarErrorInput } from '@/utils/Tokens';

import { LoginDTO } from '@/Interfaces/auth/LoginInterface';

import { loginUser } from '@/libs/auth/api-login';

import { useAuth } from '@/utils/AuthContext';

import { useLoadingStore } from '@/store/LoadingSpinner';

export default function FormLogin() {
    
    const { startLoading, stopLoading } = useLoadingStore();

    const { login } = useAuth();

    const { 
        register, 
        handleSubmit, 
        watch, formState: { errors } 
      } = useForm<LoginDTO>({
        resolver: zodResolver(loginSchemes),
        // mode : "onBlur",     
        // defaultValues: {
        //     email: "",
        //     password: "",
    
        // }
      });
    
    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
      
      try {
        startLoading();
        const response = await loginUser(data);
        
        if (response.token) {
          login(response.token); // AuthContext ya maneja el rol
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Error en el inicio de sesión');
      } finally {
        stopLoading();
      }
    };
    
    return(

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1 text-sm">
        <label htmlFor="email" className="block">Correo Electronico</label>
        <input {...register("email")} placeholder="@" className={`${standarInput} focus:outline-secondary-200`} />
        {errors.email &&
          <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
            <strong className="font-bold text-sm mr-4">{errors.email.message}</strong>
            {/* <span class="block text-sm sm:inline max-sm:mt-2">This is a error message that requires your attention.</span> */}
          </div>
          // <p className={`${standarErrorInput}`}>{errors.email.message}</p>
        }
      </div>
      <div className="space-y-1 text-sm">
        <label htmlFor="password" className="block">Contraseña</label>
        <input {...register("password")} type="password" placeholder="****" className={`${standarInput} focus:outline-secondary-200`} />
        {errors.password &&
          // <p className={`${standarErrorInput}`}>{errors.password.message}</p>
          <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
            <strong className="font-bold text-sm mr-4">{errors.password.message}</strong>
            {/* <span class="block text-sm sm:inline max-sm:mt-2">This is a error message that requires your attention.</span> */}
          </div>
        }
        <div className="flex justify-end text-xs ">
          <Link className={`underline ${standarTextLink}`} rel="noopener noreferrer" href="#">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
      <CustomButton
        text='Continuar'
        variant='secondary'
        type='submit'
        onClick={() => { }}
      />
    </form>
  );
}