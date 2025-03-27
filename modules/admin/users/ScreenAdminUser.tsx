'use client'
import { Search } from "@/components/atoms/ReactIcons";
import DropdownUser from "./DropdownUser";
import { UsersDAO, PasswordDTO } from "@/Interfaces/user/UserInterface";
import { useState, useEffect } from "react";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { deleteUserById, getUsers, searchUsers } from "@/libs/ServiceAdmin/api-admin";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/molecules/CustomModal";
import CustomIconButton from "@/components/atoms/CustomIconButton";
import CustomAlert from "@/components/atoms/CustomAlert";
import { standarInput } from "@/utils/Tokens";
import Image from "next/image";
import { UserEdit, Delete, PersonSearch, Clean } from "@/components/atoms/ReactIcons";
import { verifyPassword } from "@/libs/ServiceUser/api-user";
import { useRouter } from "next/navigation";

export default function AdminUsers(){
    const [users, setUsers] = useState<UsersDAO['users'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userIdAction, setUserIdAction] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();  

    {/* Seccion para las alertas*/}
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordDTO>();

    const onSubmitEdit: SubmitHandler<PasswordDTO> = async (data) => {
        reset();
        setIsDeleteModalOpen(false);
        if (!userIdAction) {
            alert('No se ha seleccionado ningún usuario');
            return;
        }
    
        const correctPassword = await fetchVerifyUser(data);
        if (correctPassword) {
            setIsEditModalOpen(false);
            router.push(`/admin/users/edit/${userIdAction}`)
        }
    };

    const onSubmitDelete: SubmitHandler<PasswordDTO>  = async (data) => {
        reset();
        setIsDeleteModalOpen(false);
        if (!userIdAction) {
            alert('No se ha seleccionado ningún usuario');
            return;
        }
    
        const correctPassword = await fetchVerifyUser(data);
        if (correctPassword) {
            setAlertMessage('¿Esta seguro de que quiere eliminar el usuario?');
            setAlertType('options');
            setShowAlert(true);
        }
    };

    const handleDeleteUser = async () => {
        try{
            startLoading();
            const response = await deleteUserById(userIdAction as string);

            setAlertMessage('Usuario eliminado correctamente');
            setAlertType('success');
            setShowAlert(true);
            fetchUser();
        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al eliminar');
            setAlertType('error');
            setShowAlert(true);
            return false;
        } finally {
            stopLoading();
        }
    }

    const fetchVerifyUser = async (data: PasswordDTO) => {
        try{
            startLoading();
            const response = await verifyPassword(data);

            if (!response.verify) {
                setAlertMessage(response.message);
                setAlertType('error');
                setShowAlert(true);
            }
            return true;
        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al verificar la contraseña');
            setAlertType('error');
            setShowAlert(true);
            return false;
        } finally {
            stopLoading();
        }
    }

    const handleUserSearch = async () => {
        if(searchTerm === ""){
            return
        }
        else{
            try {
                startLoading();
                const response = await searchUsers(searchTerm);

                if (response.users) {
                    setUsers(response.users);
                } else {
                    console.error('No se encontró usuarios');
                    alert('No se encontró usuarios');
                }
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                alert(error);
            } finally {
                stopLoading();
            }
        }
    }

    const handleCleanSearch = () => {
        fetchUser();
    }

    const fetchUser = async () => {
        try{
            startLoading();
            const response = await getUsers();

            if (response.users) {
                setUsers(response.users);
            } else {
                console.error('No se encontró usuarios');
                alert('No se encontró usuarios');
            }
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            alert(error);

        } finally {
            stopLoading();
        }
    }

    useEffect(() =>{

        fetchUser();
    }, [startLoading, stopLoading]);

    return(

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5  bg-white">
            <h1 className="text-2xl font-bold my-5 ml-5 text-secondary-200">Gestión de usuarios</h1>

            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row pb-4 mx-6">
                <DropdownUser/>
                <div className="flex">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mr-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500">
                            <Search />
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block p-3 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscador de usuarios"
                            value={searchTerm} // Valor controlado por el estado
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado cuando el usuario escribe
                        />
                    </div>
                    <CustomIconButton
                        icon={<PersonSearch/>}
                        variant="primary"
                        ariaLabel="search"
                        onClick={handleUserSearch}
                        tooltipText="Buscar usuario"
                        className="size-12 mr-3"
                    />
                    <CustomIconButton
                        icon={<Clean/>}
                        variant="secondary"
                        ariaLabel="search"
                        onClick={handleCleanSearch}
                        tooltipText="Limpiar busqueda"
                        className="size-12"
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {/* <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input 
                                    id="checkbox-all-search" 
                                    type="checkbox" 
                                    className="w-4 h-4 
                                    text-blue-600 bg-gray-100 
                                    border-gray-300 rounded-sm 
                                    focus:ring-blue-500
                                    focus:ring-2"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefono
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users ? (
                        <>
                            {users.map((user) => (
                                <tr key={user.user._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                        <Image 
                                            src="/profile.png" 
                                            alt="Foto de usuario" 
                                            width={32} 
                                            height={32} 
                                            className="rounded-full" 
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.user.name} {user.user.lastname}</div>
                                            <div className="font-normal text-gray-500">{user.user.email}</div>
                                        </div>  
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.user.phone}
                                    </td>
                                    <td scope="row" className="flex items-center h-full">
                                        <div className="pr-2">
                                            <CustomIconButton
                                                variant="secondary"
                                                type="button"
                                                onClick={() => {
                                                    setUserIdAction(user.user._id);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="size-10"
                                                icon={<UserEdit/>} // Icono de "Mostrar contraseña"
                                                ariaLabel="Editar" // Texto descriptivo para accesibilidad
                                                tooltipText="Editar"
                                            />
                                        </div>
                                        <div>
                                            <CustomIconButton
                                                variant="danger"
                                                type="button"
                                                onClick={() => {
                                                    setUserIdAction(user.user._id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="size-10"
                                                icon={<Delete/>} // Icono de "Mostrar contraseña"
                                                ariaLabel="Eliminar" // Texto descriptivo para accesibilidad
                                                tooltipText="Eliminar"
                                            />
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </>
                    ) : (
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50"></tr>
                    )}  
                    {/* <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input 
                                    id="checkbox-table-search-1" 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 
                                    bg-gray-100 border-gray-300 rounded-sm 
                                    focus:ring-blue-500
                                    focus:ring-2"
                                />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
                            <div className="ps-3">
                                <div className="text-base font-semibold">Neil Sims</div>
                                <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                            </div>  
                        </th>
                        <td className="px-6 py-4">
                            React Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600">Edit user</a>
                        </td>
                    </tr> */}
                </tbody>
            </table>

            {/* Modal para editar */}
            <CustomModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    reset(); // Limpiar los campos al cerrar
                    setIsEditModalOpen(false);
                }}
                title="Por seguridad, para editar un usuario debe ingresar su contraseña."
            >
                <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
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
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.password.message}</strong>
                            </div>
                        }
                    </div>
                    <div className="mt-6 flex justify-end">
                        <CustomButton
                            text="Verificar"
                            variant="primary"
                            type="submit"
                        />
                    </div>
                </form>
            </CustomModal>

            {/* Modal para eliminar */}
            <CustomModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    reset(); // Limpiar los campos al cerrar
                    setIsDeleteModalOpen(false);
                }}
                title="Por seguridad, para eliminar un usuario debe ingresar su contraseña."
            >
                <form onSubmit={handleSubmit(onSubmitDelete)} className="space-y-4">
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
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.password.message}</strong>
                            </div>
                        }
                    </div>
                    <div className="mt-6 flex justify-end">
                        <CustomButton
                            text="Verificar"
                            variant="primary"
                            type="submit"
                        />
                    </div>
                </form>
            </CustomModal>
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                >
                    {alertType === 'options' && (
                        <div className="flex gap-2 justify-end">
                            <CustomButton
                                text="Cancelar"
                                variant="danger"
                                onClick={() => setShowAlert(false)}

                            />
                            <CustomButton
                                text="Confirmar"
                                variant="green"
                                onClick={handleDeleteUser}
                            />
                        </div>
                    )}
                </CustomAlert>
            )}
        </div>
        
    );
}