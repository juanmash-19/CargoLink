'use client'
import { standarInput } from "@/utils/Tokens";
import Link from "next/link";
import CustomButton from "@/components/atoms/CustomButton";
import { useAuth } from "@/utils/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserDTO, ChangePasswordDTO, PasswordDTO } from "@/Interfaces/user/UserInterface";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { getUser, updateUser, changePassword, verifyPassword, deleteUser } from "@/libs/ServiceUser/api-user";
import { standarTextLink } from "@/utils/Tokens";
import CustomModal from "@/components/molecules/CustomModal";
import CustomAlert from "@/components/atoms/CustomAlert";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function UserPage() {
    const router = useRouter();
    const { userEmail, userName, logout } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserDTO>();
    const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetChangePassword, formState: { errors: passwordErrors } } = useForm<ChangePasswordDTO>();
    const { register: registerDelete, handleSubmit: handleDeleteSubmit, reset: resetDelete, formState: { errors: deleteErrors } } = useForm<PasswordDTO>();
    const { startLoading, stopLoading } = useLoadingStore();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const t = useTranslations();

    const [originalName, setOriginalName] = useState<string | null>(null);
    const [originalLastName, setOriginalLastName] = useState<string | null>(null);
    const [originalPhone, setOriginalPhone] = useState<string | null>(null);
    const [originalEmail, setOriginalEmail] = useState<string | null>(null);

    
    {/* Seccion para las alertas*/}
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const onSubmit: SubmitHandler<UserDTO> = async (data) => {
        const updatedFields: Partial<UserDTO> = {};
        if (originalName !== data.name) updatedFields.name = data.name;
        if (originalLastName !== data.lastname) updatedFields.lastname = data.lastname;
        if (originalPhone !== data.phone) updatedFields.phone = data.phone;
        try{
            startLoading();
            const response = await updateUser(updatedFields);
            console.log('Update successful:', response);
            if(response){
                setAlertMessage("Los cambios han sido guardados con éxito.");
                setAlertType('success');
                setShowAlert(true);
                if (updatedFields.name) setOriginalName(updatedFields.name);
                if (updatedFields.lastname) setOriginalLastName(updatedFields.lastname);
                if (updatedFields.phone) setOriginalPhone(updatedFields.phone);
            }else{
                setAlertMessage("No se han podido guardar los cambios.");
                setAlertType('error');
                setShowAlert(true);
                
                if(originalName !== null) setValue("name", originalName);
                if(originalLastName !== null) setValue("lastname", originalLastName);
                if(originalPhone !== null) setValue("phone", originalPhone);
            }
        } catch (error) {
            setAlertMessage(`Error al actualizar los datos de usuario: ${error}`);
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    const onChangePassword: SubmitHandler<ChangePasswordDTO> = async (data) => {
        try {
            startLoading();
            resetChangePassword();
            const response = await changePassword(data);
            if (response.verify) {
                setAlertMessage("Contraseña cambiada con éxito.");
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                logout();
                router.replace('/login');
            } else {
                setAlertMessage("No se pudo cambiar la contraseña. Verifique los datos ingresados.");
                setAlertType('error');
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage(`Error al cambiar la contraseña: ${error}`);
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    
    
    const onSubmitDelete: SubmitHandler<PasswordDTO>  = async (data) => {
        setIsDeleteModalOpen(false);
        setValue("password", '');
        resetDelete();
        try{
            startLoading();
            const response = await verifyPassword(data);

            if (!response.verify) {
                setAlertMessage(response.message);
                setAlertType('error');
                setShowAlert(true);
            }
            
            setAlertMessage("¿Está seguro de que desea eliminar su cuenta? (Irreversible)");
            setAlertType('options');
            setShowAlert(true);

        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al verificar la contraseña');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    const handleDeleteUser = async () => {
        setShowAlert(false);
        try {
            startLoading();
            const response = await deleteUser();
            if (response.verify) {
                setAlertMessage("Cuenta eliminada con éxito.");
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                logout();
                router.replace('/');
            } else {
                setAlertMessage("No se pudo eliminar la cuenta. Intentelo mas tarde.");
                setAlertType('error');
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage(`Error al eliminar la cuenta: ${error}`);
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                startLoading();
                const response = await getUser();
                if (response) {
                    const { name, lastname, phone, email } = response.user;
                    setOriginalName(name);
                    setOriginalLastName(lastname);
                    setOriginalPhone(phone ?? null);
                    setOriginalEmail(email ?? null);

                    setValue("name", name);
                    setValue("lastname", lastname);
                    setValue("phone", phone);
                } else {
                    console.error("No user data found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                stopLoading();
            }
        };
        fetchUser();
    }, [setValue, startLoading, stopLoading]);

    const watchName = watch("name");
    const watchLastName = watch("lastname");
    const watchPhone = watch("phone");

    const isNameModified = originalName !== null && watchName !== originalName;
    const isLastNameModified = originalLastName !== null && watchLastName !== originalLastName;
    const isPhoneModified = originalPhone !== null && watchPhone !== originalPhone;

    return (
        <div className="flex">
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    <div className="col-span-2 hidden sm:block text-gray-800">
                        <ul>
                            <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">{t('user.account.settingsTitle')}</li>
                            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billetera</li>
                            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Notificaciones</li>
                        </ul>
                    </div>
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold text-gray-800">
                                {t('user.account.settingsTitle')}
                            </h1>
                            <p className="font- text-slate-600">
                                {originalName || userName} {t('user.account.welcomeMessage')}
                            </p>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-gray-800">
                            {t('user.account.emailTitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">
                                {t('user.account.emailMessage')} {originalEmail || userEmail}
                            </p>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <form onSubmit={handleSubmit(onSubmit)} className="mr-20">
                            <p className="py-2 text-xl font-semibold text-gray-800">
                                {t('user.account.personalInfoTitle')}
                            </p>
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-sm text-gray-500">
                                        {t('user.account.nameLabel')}
                                    </span>
                                    <input
                                        type="text"
                                        {...register("name", { required: "El nombre es obligatorio" })}
                                        className={`${standarInput} focus:outline-primary-400 ${isNameModified ? "border-2 border-secondary-200" : ""}`}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                </label>
                                <label className="block">
                                    <span className="text-sm text-gray-500">
                                        {t('user.account.lastNameLabel')}
                                    </span>
                                    <input
                                        type="text"
                                        {...register("lastname")}
                                        className={`${standarInput} focus:outline-primary-400 ${isLastNameModified ? "border-2 border-secondary-200" : ""}`}
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm text-gray-500">
                                        {t('user.account.phoneLabel')}
                                    </span>
                                    <input
                                        type="tel"
                                        {...register("phone")}
                                        className={`${standarInput} focus:outline-primary-400 ${isPhoneModified ? "border-2 border-secondary-200" : ""}`}
                                    />
                                </label>
                            </div>
                            <div className="mt-4 w-fit">
                                <CustomButton
                                    text={t('user.account.saveChangesButton')}
                                    type="submit"
                                    variant="secondary"
                                />
                            </div>
                        </form>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-gray-800">
                            {t('user.account.passwordTitle')}
                        </p>
                        <form onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-4">
                            <label className="block">
                                <span className="text-sm text-gray-500">
                                    {t('user.account.currentPasswordLabel')}
                                </span>
                                <input
                                    type="password"
                                    {...registerPassword("password", { required: "La contraseña actual es obligatoria" })}
                                    className={standarInput}
                                />
                                {passwordErrors.password && <p className="text-sm text-red-500">{passwordErrors.password.message}</p>}
                            </label>
                            <label className="block">
                                <span className="text-sm text-gray-500">
                                    {t('user.account.newPasswordLabel')}
                                </span>
                                <input
                                    type="password"
                                    {...registerPassword("newPassword", { required: "La nueva contraseña es obligatoria" })}
                                    className={standarInput}
                                />
                                {passwordErrors.newPassword && <p className="text-sm text-red-500">{passwordErrors.newPassword.message}</p>}
                            </label>
                            <div className="mt-4 w-fit">
                                <CustomButton
                                    text={t('user.account.savePasswordButton')}
                                    type="submit"
                                    variant="primary"
                                />
                            </div>
                        </form>
                        <p className="mt-2 text-slate-600">
                            {t('user.account.forgotPasswordText')} <Link className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">{t('user.account.recoverAccountLink')}</Link>
                        </p>
                        <div className="">

                        </div>
                        <hr className="mt-4 mb-8" />

                        <div className="mb-10">
                            <p className="py-2 text-xl font-semibold text-gray-800">
                                {t('user.account.deleteAccountTitle')}
                            </p>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {t('user.account.proceedWithCaution')}
                            </p>
                            <p className="mt-2 text-slate-600">
                                {t('user.account.deleteAccountWarning')}
                            </p>
                            <button className={`${standarTextLink} text-rose-600 underline decoration-2`} onClick={() => {setIsDeleteModalOpen(true);}}>
                                {t('user.account.deleteAccountButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                >
                    {alertType === 'options' && (
                        <div className="flex gap-2 justify-end">
                            <CustomButton
                                text={t('user.account.cancelButton')}
                                variant="primary"
                                onClick={() => setShowAlert(false)}

                            />
                            <CustomButton
                                text={t('user.account.confirmDeleteButton')}
                                variant="danger"
                                onClick={handleDeleteUser}
                            />
                        </div>
                    )}
                </CustomAlert>
            )}

            {/* Modal para editar */}
            <CustomModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    resetDelete();
                    setIsDeleteModalOpen(false);
                }}
                title={t('user.account.deleteAccountModalTitle')}
            >
                <form onSubmit={handleDeleteSubmit(onSubmitDelete) } className="space-y-4">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                        {t('user.account.passwordTitle')}
                        </label>
            
                        <input
                        {...registerDelete("password")}
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
                    <div className="mt-6 flex justify-end">
                        <CustomButton
                            text={t('user.account.verifyButton')}
                            variant="danger"
                            type="submit"
                        />
                    </div>
                </form>
            </CustomModal>
        </div>
    );
}