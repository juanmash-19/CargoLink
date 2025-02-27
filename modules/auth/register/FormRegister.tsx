'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
// import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {registerSchemes} from '@/Schemes/RegisterSchemes';

import CustomButton from '@/components/atoms/CustomButton';

import { standarInput, standarTextLink, standarErrorInput } from '@/utils/Tokens';

import { RegisterDTO } from '@/Interfaces/auth/RegisterInterface';

import { useRouter } from "next/navigation";

import { registerUser } from '@/libs/auth/ServiceRegister/api-services';

import { useAuth } from '@/utils/AuthContext';

export default function FormRegister() {

    const router = useRouter();

    const { login } = useAuth();

    const { 
        register, 
        handleSubmit, 
        watch, formState: { errors } 
      } = useForm<RegisterDTO>({
        resolver: zodResolver(registerSchemes),
        // mode:"onBlur",  
        // defaultValues: {
        //     name: "",
        //     surname: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        // }
      });
    
    //   const password = watch("password");
    //   const confirmPassword = watch("confirmPassword");
    //   const passwordMatch = confirmPassword === password;
    
    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        try {
            data.role = 'user';
            const response = await registerUser(data);
            console.log('Register successful:', response);

            if(response.token){
                login(response.token);
            }

        

            router.replace('/'); // Redirige al usuario
        } catch (error) {
            console.error('Register failed:', error);
            alert('Error al crear la cuenta. Por favor, verifica tus credenciales.');
        }
    }
    
    
    console.log(errors);
    
    return(

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
            Nombre(s)
            </label>

            <input
            {...register("name")}
            type="text"
            // id="FirstName"
            // name="first_name"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.name &&
                <p className={`${standarErrorInput}`}>{errors.name.message}
                </p>
            }
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
            Apellido(s)
            </label>

            <input
            {...register("lastname")}
            type="text"
            // id="LastName"
            // name="last_name"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.lastname && 
                <p className={`${standarErrorInput}`}>{errors.lastname.message}
                </p>}
        </div>

        <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> 
            Correo
            </label>

            <input
            {...register("email")}
            // type="email"
            // id="Email"
            // name="email"
            className={`${standarInput} focus:outline-primary-400`} />
            {errors.email && 
                <p className={`${standarErrorInput}`}>{errors.email.message}
                </p>}
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
            Contraseña
            </label>

            <input
            {...register("password")}
            type="password"
            placeholder='******'
            // id="Password"
            // name="password"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.password && 
                <p className={`${standarErrorInput}`}>{errors.password.message}
                </p>}
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
            </label>

            <input
            {...register("confirmPassword")}
            type="password"
            // id="PasswordConfirmation"
            placeholder='******'
            // name="password_confirmation"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.confirmPassword && <p className={`${standarErrorInput}`}>{errors.confirmPassword.message}</p>}
        </div>

        <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="size-5 rounded-md border-gray-200 bg-white shadow-xs"
            />

            <span className="text-sm text-gray-700">
            Quiero recibir correos electrónicos sobre eventos, actualizaciones y anuncios de CargoLink.
            </span>
            </label>
        </div>

        <div className="col-span-6">
            <p className="text-sm text-gray-500">
            Al crear una cuenta, aceptas nuestros
             <Link href="#" className={`underline ${standarTextLink}`}> términos y condiciones</Link>
            .
            </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <CustomButton
                text='Crear cuenta'
                variant='primary'
                type='submit'
                onClick={() => {}}
                />

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            ¿Ya tienes una cuenta?
            <Link href="#" className={`underline ${standarTextLink}`}>Ingresa</Link>.
            </p>
        </div>
    </form>
    );
}