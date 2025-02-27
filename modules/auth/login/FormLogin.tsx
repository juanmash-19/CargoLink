'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
// import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {loginSchemes} from '@/Schemes/LoginSchemes';

import CustomButton from '@/components/atoms/CustomButton';

import { standarInput, standarTextLink, standarErrorInput } from '@/utils/Tokens';

import { LoginDTO } from '@/Interfaces/auth/LoginInterface';

import { useRouter } from "next/navigation";

import { loginUser } from '@/libs/auth/ServiceLogin/api-services';

import Cookies from 'js-cookie';

import { useAuth } from '@/utils/AuthContext';

export default function FormLogin() {

    const router = useRouter();

    const { refreshUserRole } = useAuth();

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
          const response = await loginUser(data);
          console.log('Login successful:', response);

          if(response.token){
            Cookies.set('token', response.token, { maxAge: "3600", secure: true });
            await refreshUserRole();
          }

          console.log(Cookies.get('token'));

          router.replace('/'); // Redirige al usuario
        } catch (error) {
          console.error('Login failed:', error);
          alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
        }
      };
    
    return(

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block">Correo Electronico</label>
            <input {...register("email")} placeholder="@" className={`${standarInput} focus:outline-secondary-200`} />
            {errors.email && <p className={`${standarErrorInput}`}>{errors.email.message}</p>}
        </div>
        <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">Contraseña</label>
            <input {...register("password")} type="password" placeholder="****" className={`${standarInput} focus:outline-secondary-200`} />
            {errors.password && <p className={`${standarErrorInput}`}>{errors.password.message}</p>}
            <div className="flex justify-end text-xs ">
                <Link className={`underline ${standarTextLink}`} rel="noopener noreferrer" href="#">¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
        <CustomButton 
            text='Continuar'
            variant='secondary'
            type='submit'
            onClick={() => {}}
            />
    </form>
    );
}