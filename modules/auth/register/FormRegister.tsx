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

import { registerUser } from '@/libs/auth/api-register';

import { useAuth } from '@/utils/AuthContext';

import { useLoadingStore } from '@/store/LoadingSpinner';

import { useTranslations } from "next-intl";

export default function FormRegister() {

    const { login } = useAuth();
    
    const { startLoading, stopLoading } = useLoadingStore();

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

    const t = useTranslations();
    
    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        try {
            startLoading();
            data.role = 'user';
            const response = await registerUser(data);
            console.log('Register successful:', response);

            if(response.token){
                login(response.token);
            }

        } catch (error) {
            console.error('Register failed:', error);
            alert('Error al crear la cuenta. Por favor, verifica tus credenciales.');
        } finally {
            stopLoading();
        }
    }
    
    
    console.log(errors);
    
    return(

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
            {t('auth.register.firstName')}
            </label>

            <input
            {...register("name")}
            type="text"
            // id="FirstName"
            // name="first_name"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.name &&
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                    <strong className="font-bold text-sm mr-4">{errors.name.message}</strong>
                {/* <span class="block text-sm sm:inline max-sm:mt-2">This is a error message that requires your attention.</span> */}
                </div>
            }
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
            {t('auth.register.lastName')}
            </label>

            <input
            {...register("lastname")}
            type="text"
            // id="LastName"
            // name="last_name"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.lastname && 
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                    <strong className="font-bold text-sm mr-4">{errors.lastname.message}</strong>
            {/* <span class="block text-sm sm:inline max-sm:mt-2">This is a error message that requires your attention.</span> */}
                </div>
                }
        </div>

        <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> 
            {t('auth.register.email')}
            </label>

            <input
            {...register("email")}
            // type="email"
            // id="Email"
            // name="email"
            className={`${standarInput} focus:outline-primary-400`} />
            {errors.email && 
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                    <strong className="font-bold text-sm mr-4">{errors.email.message}</strong>
                </div>
                }
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
            {t('auth.register.password')}
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
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                    <strong className="font-bold text-sm mr-4">{errors.password.message}</strong>
                </div>
            }
        </div>

        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
            {t('auth.register.confirmPassword')}
            </label>

            <input
            {...register("confirmPassword")}
            type="password"
            // id="PasswordConfirmation"
            placeholder='******'
            // name="password_confirmation"
            className={`${standarInput} focus:outline-primary-400`}
            />
            {errors.confirmPassword && 
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                    <strong className="font-bold text-sm mr-4">{errors.confirmPassword.message}</strong>
                </div> 
            }
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
            {t('auth.register.marketingAccept')}
            </span>
            </label>
        </div>

        <div className="col-span-6">
            <p className="text-sm text-gray-500">
            {t('auth.register.termsAndConditions')}
             <Link href="#" className={`underline ${standarTextLink}`}>{t('auth.register.termsLink')}</Link>.
            </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <CustomButton
                text={t('auth.register.createAccountButton')}
                variant='primary'
                type='submit'
                onClick={() => {}}
                />

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            {t('auth.register.alreadyHaveAccount')}
            <Link href="#" className={`underline ${standarTextLink}`}>{t('auth.register.loginLink')}</Link>.
            </p>
        </div>
    </form>
    );
}