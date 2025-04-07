'use client'
import { useLoadingStore } from "@/store/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import { UserDAO, UserDTO } from "@/Interfaces/user/UserInterface";
import { useState, useEffect } from "react";
import { getUserById, putUserById } from "@/libs/ServiceAdmin/api-admin";
import BasicTextCardProps from "@/components/atoms/BasicTextCard";
import { useForm, SubmitHandler } from "react-hook-form";
import { standarInput } from "@/utils/Tokens";
import CustomButton from "@/components/atoms/CustomButton";
import CustomAlert from "@/components/atoms/CustomAlert";
import { UserEditScheme } from "@/Schemes/adminSchemes/UserEditScheme";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ScreenAdminEditShipment(){

    const params = useParams();
    const idUser = params.user;
    const [ user, setUser ] = useState<UserDAO['user'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();

    const router = useRouter();

    {/* Seccion para las alertas*/}
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const { 
        register, 
        handleSubmit, 
        watch, formState: { errors } 
        } = useForm<UserDTO>({
            resolver : zodResolver(UserEditScheme)
        });


    const handleBack = () =>{
        router.back()
    }

    useEffect(() => {

        const fetchUser = async () => {
            if (!idUser) return; // Si no hay ID, no hacemos nada

            try {
                startLoading(); // Activa el spinner de carga
                const response = await getUserById(idUser as string);

                if (response.user._id) {
                    setUser(response.user); // Actualiza el estado con los datos del envío
                } else {
                    setAlertMessage('No se encontro el usuario');
                    setAlertType('error');
                    setShowAlert(true);
                }
            } catch (error) {
                setAlertMessage(error instanceof Error ? error.message : 'Error al obtener el usuario');
                setAlertType('error');
                setShowAlert(true);
            } finally {
                stopLoading(); // Desactiva el spinner de carga
            }
        };

        fetchUser(); // Ejecuta la función para obtener los datos
    }, [idUser, startLoading, stopLoading]); // Dependencias: id, startLoading, stopLoading

    if (!user) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga si no hay datos
    }

    const onSubmit: SubmitHandler<UserDTO> = async (data) => {
        try {
            startLoading();
            const response = await putUserById(data, idUser as string);
            console.log('Edit successful:', response);

            if(response.user._id) {
                setAlertMessage('Usuario actualizado correctamente');
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => router.push('/admin/users'), 2000);
            }

        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al actualizar');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    }

    return(
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-primary-300">Detalles del usuario</h1>
                <div className="space-y-4">
                    <BasicTextCardProps
                        title="Información General"
                        subtitles={[
                            { label: "ID", content: user._id },
                            { label: "Correo", content: user.email },
                            { label: "Telefono", content: user.phone },
                        ]}
                    />

                    <BasicTextCardProps
                        title="Nombres"
                        subtitles={[
                            { label: "Nombre", content: user.name },
                            { label: "Apellido", content: user.lastname },
                        ]}
                    />

                    <BasicTextCardProps
                        title="Rol"
                        subtitles={[
                            { label: "Rol", content: user.role },
                        ]}
                    />
                </div>
            </div>
            <div className="mx-10">
                <h1 className="text-3xl font-bold text-secondary-200">Editar usuario</h1>
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
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.name.message}</strong>
                            </div>
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
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.lastname.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Phone" className="block text-sm font-medium text-gray-700"> 
                            Telefono
                        </label>

                        <input
                        {...register("phone")}
                        type="number"
                        className={`${standarInput} focus:outline-primary-400`} />
                        {errors.email && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.email.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Role" className="block text-sm font-medium text-gray-700"> 
                            Rol
                        </label>

                        <select 
                            {...register("role")}
                            defaultValue={user.role} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-400 peer"
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="transporter">Repartidor</option>
                            <option value="user">Usuario</option>
                        </select>

                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                        </label>

                        <input
                        {...register("password")}
                        type="password"
                        placeholder='******'
                        className={`${standarInput} focus:outline-primary-400`}
                        />
                        {errors.password && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.password.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <CustomButton
                            text='Editar usuario'
                            variant='primary'
                            type='submit'
                            onClick={() => {}}
                        />
                        <CustomButton
                            text='Volver'
                            variant='secondary'
                            type='button'
                            onClick={handleBack}
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