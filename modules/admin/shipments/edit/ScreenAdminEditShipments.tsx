'use client'
import { useLoadingStore } from "@/store/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import { ShipmentDAO, ShipmentDTO } from "@/Interfaces/shipment/ShipmentInterface";
import { useState, useEffect } from "react";
import { getShipmentById, putShipmentById } from "@/libs/ServiceAdmin/api-admin";
import { useForm, SubmitHandler } from "react-hook-form";
import { standarInput } from "@/utils/Tokens";
import CustomButton from "@/components/atoms/CustomButton";
import CustomAlert from "@/components/atoms/CustomAlert";
import QuantityInput from "@/components/molecules/QuantityInput";
// import { ShipmentEditScheme } from "@/Schemes/adminSchemes/ShipmentEditScheme";
// import { zodResolver } from "@hookform/resolvers/zod";

export default function ScreenAdminEditShipment(){

    const params = useParams();
    const idShipment = params.shipment;
    // const [ shipment, setShipment ] = useState<ShipmentDAO['shipment'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();

    const router = useRouter();

    const [originalImageUrl, setOriginalImageUrl] = useState<string | undefined>(undefined);
    const [originalPickupAddress, setOriginalPickupAddress] = useState<string | null>(null);
    const [originalDeliveryAddress, setOriginalDeliveryAddress] = useState<string | null>(null);
    const [originalTitle, setOriginalTitle] = useState<string | null>(null);
    const [originalDescription, setOriginalDescription] = useState<string | null>(null);
    const [originalWeight, setOriginalWeight] = useState<number | null>(null);
    const [originalStatus, setOriginalStatus] = useState<string | undefined>(undefined);
    const [originalHeight, setOriginalHeight] = useState<number | null>(null);
    const [originalWidth, setOriginalWidth] = useState<number | null>(null);
    const [originalLength, setOriginalLength] = useState<number | null>(null);

    {/* Seccion para las alertas*/}
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const { 
        register, 
        handleSubmit, 
        watch, setValue, formState: { errors } 
        } = useForm<ShipmentDTO>({
            // resolver : zodResolver(ShipmentEditScheme)
        });


    const handleBack = () =>{
        router.back()
    }



    const fetchShipment = async () => {
        if (!idShipment) return; // Si no hay ID, no hacemos nada

        try {
            startLoading(); // Activa el spinner de carga
            const response = await getShipmentById(idShipment as string);

            if (response.shipment._id) {
                const { imageUrl, pickupAddress, deliveryAddress, title, description, weight, dimensions, status } = response.shipment;
                setOriginalImageUrl(imageUrl);
                setOriginalPickupAddress(pickupAddress);
                setOriginalDeliveryAddress(deliveryAddress);
                setOriginalTitle(title);
                setOriginalDescription(description);
                setOriginalWeight(weight);
                setOriginalStatus(status);
                setOriginalHeight(dimensions.height);
                setOriginalWidth(dimensions.width);
                setOriginalLength(dimensions.length);

                // setValue("imageUrl", imageUrl);
                setValue("pickupAddress", pickupAddress);
                setValue("deliveryAddress", deliveryAddress);
                setValue("title", title);
                setValue("description", description);
                setValue("weight", weight);
                setValue("status", status);
                setValue("dimensions.height", dimensions.height);
                setValue("dimensions.width", dimensions.width);
                setValue("dimensions.length", dimensions.length);


            } else {
                setAlertMessage('No se encontro el envio');
                setAlertType('error');
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al obtener el envio');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading(); // Desactiva el spinner de carga
        }
    };

    useEffect(() => {

        fetchShipment(); // Ejecuta la función para obtener los datos
    }, [idShipment, startLoading, stopLoading]); // Dependencias: id, startLoading, stopLoading


    const onSubmit: SubmitHandler<ShipmentDTO> = async (data) => {
        const updatedFields: Partial<ShipmentDTO> = {};
        // if (originalImageUrl !== data.imageUrl) updatedFields.imageUrl = data.imageUrl;
        if (originalPickupAddress !== data.pickupAddress) updatedFields.pickupAddress = data.pickupAddress;
        if (originalDeliveryAddress !== data.deliveryAddress) updatedFields.deliveryAddress = data.deliveryAddress;
        if (originalTitle !== data.title) updatedFields.title = data.title;
        if (originalDescription !== data.description) updatedFields.description = data.description;
        if (originalWeight !== data.weight) updatedFields.weight = data.weight;
        if (originalStatus !== data.status) updatedFields.status = data.status;
        if (originalHeight !== data.dimensions?.height) updatedFields.dimensions = { ...updatedFields.dimensions, height: data.dimensions?.height };
        if (originalWidth !== data.dimensions?.width) updatedFields.dimensions = { ...updatedFields.dimensions, width: data.dimensions?.width };
        if (originalLength !== data.dimensions?.length) updatedFields.dimensions = { ...updatedFields.dimensions, length: data.dimensions?.length };
        try {
            startLoading();
            const response = await putShipmentById(updatedFields, idShipment as string);
            console.log('Edit successful:', response);

            if(response.shipment._id) {
                setAlertMessage('Envio actualizado correctamente');
                setAlertType('success');
                setShowAlert(true);
                fetchShipment(); // Refresca los datos después de la edición
            }

        } catch (error) {
            setAlertMessage(error instanceof Error ? error.message : 'Error al actualizar');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    }

    // const watchImageUrl = watch("imageUrl");
    const watchTitle = watch("title");
    const watchPickupAddress = watch("pickupAddress");
    const watchDeliveryAddress = watch("deliveryAddress");
    const watchWeight = watch("weight");
    const watchStatus = watch("status");
    const watchDescription = watch("description");
    const watchHeight = watch("dimensions.height");
    const watchWidth = watch("dimensions.width");
    const watchLength = watch("dimensions.length");

    // const isImgeUrlModified = originalImageUrl !== null && watchImageUrl !== originalImageUrl;
    const isPickupAddressModified = originalPickupAddress !== null && watchPickupAddress !== originalPickupAddress;
    const isDeliveryAddressModified = originalDeliveryAddress !== null && watchDeliveryAddress !== originalDeliveryAddress;
    const isTitleModified = originalTitle !== null && watchTitle !== originalTitle;
    const isDescriptionModified = originalDescription !== null && watchDescription !== originalDescription;
    const isWeightModified = originalWeight !== null && watchWeight !== originalWeight;
    const isStatusModified = originalStatus !== null && watchStatus !== originalStatus;
    const isHeightModified = originalHeight !== null && watchHeight !== originalHeight;
    const isWidthModified = originalWidth !== null && watchWidth !== originalWidth;
    const isLengthModified = originalLength !== null && watchLength !== originalLength;

    return(
        <div className="max-w-screen-sm mx-auto w-3/4 md:w-3/4 mt-11 mb-3">
            <div className="">
                <h1 className="text-3xl font-bold text-secondary-200">Editar envio</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Titulo
                        </label>

                        <input
                        {...register("title")}
                        type="text"
                        className={`${standarInput} focus:outline-primary-400 ${isTitleModified ? "border-2 border-secondary-200" : ""}`}
                        />
                        {errors.title &&
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.title.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="pickipAddress" className="block text-sm font-medium text-gray-700">
                            Dirección de recogida
                        </label>

                        <input
                        {...register("pickupAddress")}
                        type="text"
                        className={`${standarInput} focus:outline-primary-400 ${isPickupAddressModified ? "border-2 border-secondary-200" : ""}`}
                        />
                        {errors.pickupAddress && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.pickupAddress.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700"> 
                            Direccion de entrega
                        </label>

                        <input
                        {...register("deliveryAddress")}
                        type="text"
                        className={`${standarInput} focus:outline-primary-400 ${isDeliveryAddressModified ? "border-2 border-secondary-200" : ""}`}
                        />
                        {errors.deliveryAddress && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.deliveryAddress.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            Peso
                        </label>
                        <input
                        {...register("weight")}
                        type="number"
                        className={`${standarInput} focus:outline-primary-400 ${isWeightModified ? "border-2 border-secondary-200" : ""}`}
                        />
                        {errors.weight && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.weight.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="dimensions" className="block text-lg font-medium">Dimensiones</label>
                        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                                <QuantityInput
                                    id="weight"
                                    name="weight"
                                    setValue={setValue}
                                    watch={watch}
                                    min={1}
                                    step={1}
                                    className={isWeightModified ? "border-2 border-secondary-200" : ""}
                                />
                            </div>
        
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Alto (cm)</label>
                                <QuantityInput
                                    id="height"
                                    name="dimensions.height"
                                    setValue={setValue}
                                    watch={watch}
                                    min={1}
                                    step={1}
                                    className={isHeightModified ? "border-2 border-secondary-200" : ""}
                                />
                            </div>
        
                            <div>
                                <label htmlFor="width" className="block text-sm font-medium text-gray-700">Ancho (cm)</label>
                                <QuantityInput
                                    id="width"
                                    name="dimensions.width"
                                    setValue={setValue}
                                    watch={watch}
                                    min={1}
                                    step={1}
                                    className={isWidthModified ? "border-2 border-secondary-200" : ""}
                                />
                            </div>
        
                            <div>
                                <label htmlFor="length" className="block text-sm font-medium text-gray-700">Largo (cm)</label>
                                <QuantityInput
                                    id="length"
                                    name="dimensions.length"
                                    setValue={setValue}
                                    watch={watch}
                                    min={1}
                                    step={1}
                                    className={isLengthModified ? "border-2 border-secondary-200" : ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripcion
                        </label>

                        <textarea
                        {...register("description")}
                        rows={4}
                        className={`${standarInput} focus:outline-primary-400 ${isDescriptionModified ? "border-2 border-secondary-200" : ""}`}
                        ></textarea>
                        {errors.description && 
                            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                                <strong className="font-bold text-sm mr-4">{errors.description.message}</strong>
                            </div>
                        }
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Status" className="block text-sm font-medium text-gray-700"> 
                            Estatus
                        </label>

                        <select 
                            {...register("status")}
                            defaultValue={originalStatus} 
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 ${isStatusModified ? "border-2 border-secondary-200" : ""} appearance-none focus:outline-none focus:ring-0 focus:border-primary-400 peer`}
                        >
                            <option value="pending">Pendiente</option>
                            <option value="activated">Activo</option>
                            <option value="accepted">Aceptado</option>
                            <option value="in_transit">En transito</option>
                            <option value="delivered">Entregado</option>
                            <option value="canceled">Cancelado</option>
                        </select>

                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <CustomButton
                            text='Editar envio'
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