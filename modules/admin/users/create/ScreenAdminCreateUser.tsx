'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { standarInput } from "@/utils/Tokens";
import CustomButton from "@/components/atoms/CustomButton";
import CustomAlert from "@/components/atoms/CustomAlert";
import { UserDTO } from "@/Interfaces/user/UserInterface";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { createUser } from "@/libs/ServiceAdmin/api-admin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ScreenAdminCreateUser() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();

    const router = useRouter();

    const { startLoading, stopLoading } = useLoadingStore();

    const t = useTranslations();

    {/* Seccion para las alertas*/}
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const onSubmit: SubmitHandler<UserDTO> = async (data) => {
        try {
            startLoading();
            
            const response = await createUser(data);

            if(response.user._id){
                setAlertType('success');
                setAlertMessage('Usuario creado correctamente');
                setShowAlert(true);
                setTimeout(() => router.push('/admin/users'), 2000);
            } 
        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al crear');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-primary-300 text-center">{t('admin.users.create.title')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.firstName')}
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.lastName')}
                        </label>
                        <input
                            {...register("lastname")}
                            type="text"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.email')}
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.phone')}
                        </label>
                        <input
                            {...register("phone")}
                            type="number"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.password')}
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="******"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.confirmPassword')}
                        </label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="******"
                            className={`${standarInput} focus:outline-primary-400`}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Role" className="block text-sm font-medium text-gray-700">
                            {t('admin.users.create.role')}
                        </label>
                        <select
                            {...register("role", { required: "El rol es obligatorio" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-400 peer"
                        >
                            <option value="">{t('admin.users.create.selectRole')}</option>
                            <option value="admin">{t('admin.users.create.roles.admin')}</option>
                            <option value="transporter">{t('admin.users.create.roles.transporter')}</option>
                            <option value="user">{t('admin.users.create.roles.user')}</option>
                        </select>
                    </div>

                    <div className="col-span-6">
                        <CustomButton
                            type="submit"
                            text={t('admin.users.create.createButton')}
                            variant="primary"
                        />
                    </div>
                </form>
            </div>
            
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
}