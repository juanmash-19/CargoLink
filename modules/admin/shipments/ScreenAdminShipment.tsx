'use client'
import { } from "@/components/atoms/ReactIcons";
// import DropdownShipment from "./DropdownShipments";
import {PasswordDTO} from "@/Interfaces/user/UserInterface";
import { useState, useEffect } from "react";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { deleteShipmentById, getShipments, searchShipments } from "@/libs/ServiceAdmin/api-admin";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/molecules/CustomModal";
import CustomIconButton from "@/components/atoms/CustomIconButton";
import CustomAlert from "@/components/atoms/CustomAlert";
import { standarInput } from "@/utils/Tokens";
import Image from "next/image";
import { RegEdit, Delete, Clean, PackageSearch, Search, InfoCard } from "@/components/atoms/ReactIcons";
import { verifyPassword } from "@/libs/ServiceUser/api-user";
import { useRouter } from "next/navigation";
import { ShipmentsDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { useTranslations } from "next-intl";

export default function ScreenAdminShipments(){
    const t = useTranslations();
    const [shipments, setShipemts] = useState<ShipmentsDAO['shipments'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [shipmentIdAction, setShipmentIdAction] = useState<string | null>(null);
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

    const onSubmitInfo: SubmitHandler<PasswordDTO> = async (data) => {
        reset();
        setIsInfoModalOpen(false);
        if (!shipmentIdAction) {
            alert('No se ha seleccionado ningún envio');
            return;
        }

        const correctPassword = await fetchVerifyUser(data);
        if (correctPassword) {
            setIsInfoModalOpen(false);
            router.push(`/admin/shipments/me/${shipmentIdAction}`)

        }
    };

    const onSubmitEdit: SubmitHandler<PasswordDTO> = async (data) => {
        reset();
        setIsDeleteModalOpen(false);
        if (!shipmentIdAction) {
            alert('No se ha seleccionado ningún envio');
            return;
        }
    
        const correctPassword = await fetchVerifyUser(data);
        if (correctPassword) {
            setIsEditModalOpen(false);
            router.push(`/admin/shipments/edit/${shipmentIdAction}`)
        }
    };

    const onSubmitDelete: SubmitHandler<PasswordDTO>  = async (data) => {
        reset();
        setIsDeleteModalOpen(false);
        if (!shipmentIdAction) {
            alert('No se ha seleccionado ningún envio');
            return;
        }
    
        const correctPassword = await fetchVerifyUser(data);
        if (correctPassword) {
            setAlertMessage('¿Esta seguro de que quiere eliminar el envio?');
            setAlertType('options');
            setShowAlert(true);
        }
    };

    const handleDeleteShipment = async () => {
        try{
            startLoading();
            const response = await deleteShipmentById(shipmentIdAction as string);

            setAlertMessage('Envio eliminado correctamente');
            setAlertType('success');
            setShowAlert(true);
            fetchShipment();
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

    const handleShipmentSearch = async () => {
        if(searchTerm === ""){
            return
        }
        else{
            try {
                startLoading();
                const response = await searchShipments(searchTerm);

                if (response.shipments) {
                    setShipemts(response.shipments);
                } else {
                    console.error('No se encontró envios');
                    alert('No se encontró envios');
                }
            } catch (error) {
                console.error('Error al obtener los envios:', error);
                alert(error);
            } finally {
                stopLoading();
            }
        }
    }

    const handleCleanSearch = () => {
        fetchShipment();
    }

    const fetchShipment = async () => {
        try{
            startLoading();
            const response = await getShipments();

            if (response.shipments) {
                setShipemts(response.shipments);
            } else {
                console.error('No se encontró envios');
                alert('No se encontró envios');
            }
        } catch (error) {
            console.error('Error al obtener los envios:', error);
            alert(error);

        } finally {
            stopLoading();
        }
    }

    useEffect(() =>{

        fetchShipment();
    }, [startLoading, stopLoading]);

    return(

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5  bg-white">
            <h1 className="text-2xl font-bold my-5 ml-5 text-secondary-200">{t('admin.shipments.manage.title')}</h1>

            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row pb-4 mx-6">
                {/* <DropdownShipment/> */}
                <div className="flex">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mr-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500">
                            <Search />
                        </div>
                        <input
                            type="text"
                            id="table-search-shipments"
                            className="block p-3 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('admin.shipments.manage.searchPlaceholder')}
                            value={searchTerm} // Valor controlado por el estado
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado cuando el usuario escribe
                        />
                    </div>
                    <CustomIconButton
                        icon={<PackageSearch/>}
                        variant="primary"
                        ariaLabel="search"
                        onClick={handleShipmentSearch}
                        tooltipText={t('admin.shipments.manage.searchTooltip')}
                        className="size-12 mr-3"
                    />
                    <CustomIconButton
                        icon={<Clean/>}
                        variant="secondary"
                        ariaLabel="search"
                        onClick={handleCleanSearch}
                        tooltipText={t('admin.shipments.manage.clearSearchTooltip')}
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
                        <th scope="col" className="px-6 py-3">{t('admin.shipments.manage.titleColumn')}</th>
                        <th scope="col" className="px-6 py-3">{t('admin.shipments.manage.statusColumn')}</th>
                        <th scope="col" className="px-6 py-3">{t('admin.shipments.manage.optionsColumn')}</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments ? (
                        <>
                            {shipments.map((shipment) => (
                                <tr key={shipment.shipment._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                        <Image 
                                            src={shipment.shipment.imageUrl || "/default-shipment.png"} 
                                            alt="Foto del envio" 
                                            width={32} 
                                            height={32} 
                                            className="rounded-sm" 
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{shipment.shipment.title}</div>
                                            <div className="font-normal text-gray-500">Altura: {shipment.shipment.dimensions.height} | Longitud: {shipment.shipment.dimensions.length} | Ancho: {shipment.shipment.dimensions.width}</div>
                                        </div>  
                                    </th>
                                    <td className="px-6 py-4">
                                        {shipment.shipment.status}
                                    </td>
                                    <td scope="row" className="flex items-center h-full">
                                        <div className="pr-2">
                                            <CustomIconButton
                                                variant="primary"
                                                type="button"
                                                onClick={() => {
                                                    setShipmentIdAction(shipment.shipment._id);
                                                    setIsInfoModalOpen(true);
                                                }}
                                                className="size-10"
                                                icon={<InfoCard/>} // Icono de "Mostrar contraseña"
                                                ariaLabel="Detalles" // Texto descriptivo para accesibilidad
                                                tooltipText={t('admin.shipments.manage.detailsTooltip')}
                                            />
                                        </div>
                                        
                                        <div className="pr-2">
                                            <CustomIconButton
                                                variant="secondary"
                                                type="button"
                                                onClick={() => {
                                                    setShipmentIdAction(shipment.shipment._id);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="size-10"
                                                icon={<RegEdit/>} // Icono de "Mostrar contraseña"
                                                ariaLabel="Editar" // Texto descriptivo para accesibilidad
                                                tooltipText={t('admin.shipments.manage.editTooltip')}
                                            />
                                        </div>
                                        <div>
                                            <CustomIconButton
                                                variant="danger"
                                                type="button"
                                                onClick={() => {
                                                    setShipmentIdAction(shipment.shipment._id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="size-10"
                                                icon={<Delete/>} // Icono de "Mostrar contraseña"
                                                ariaLabel="Eliminar" // Texto descriptivo para accesibilidad
                                                tooltipText={t('admin.shipments.manage.deleteTooltip')}
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

            {/* Modal para ver detalles */}
            <CustomModal
                isOpen={isInfoModalOpen}
                onClose={() => {
                    reset(); // Limpiar los campos al cerrar
                    setIsInfoModalOpen(false);
                }}
                title={t('admin.shipments.manage.securityDetailsModalTitle')}
            >
                <form onSubmit={handleSubmit(onSubmitInfo)} className="space-y-4">
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
                            text={t('admin.shipments.manage.verifyButton')}
                            variant="primary"
                            type="submit"
                        />
                    </div>
                </form>
            </CustomModal>

            {/* Modal para editar */}
            <CustomModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    reset(); // Limpiar los campos al cerrar
                    setIsEditModalOpen(false);
                }}
                title={t('admin.shipments.manage.securityEditModalTitle')}
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
                            text={t('admin.shipments.manage.verifyButton')}
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
                title={t('admin.shipments.manage.securityDeleteModalTitle')}
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
                            text={t('admin.shipments.manage.verifyButton')}
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
                                text={t('admin.shipments.manage.cancelButton')}
                                variant="danger"
                                onClick={() => setShowAlert(false)}

                            />
                            <CustomButton
                                text={t('admin.shipments.manage.confirmButton')}
                                variant="green"
                                onClick={handleDeleteShipment}
                            />
                        </div>
                    )}
                </CustomAlert>
            )}
        </div>
        
    );
}