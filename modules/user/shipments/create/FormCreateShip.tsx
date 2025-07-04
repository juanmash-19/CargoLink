'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "@/components/atoms/CustomButton";
import { standarInput } from "@/utils/Tokens";
import QuantityInput from '@/components/molecules/QuantityInput';
import { ShipmentDTO } from "@/Interfaces/shipment/ShipmentInterface";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { createShipment, uploadImageToCloudinary } from "@/libs/ServiceShipment/api-shipment";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { fetchDepartments, fetchCities } from "@/libs/ColombiaAPI";
import { DepartmentDAO, CityDAO } from "@/Interfaces/apis/ColombiaAPIInterface";
import { useTranslations } from "next-intl";
import CustomAlert from "@/components/atoms/CustomAlert";

export default function FormCreateShip() {
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [pickupDepartments, setPickupDepartments] = useState<DepartmentDAO[]>([]);
    const [pickupCities, setPickupCities] = useState<CityDAO[]>([]);
    const [pickupDepartment, setPickupDepartment] = useState<{ id: string; name: string } | null>(null);
    const [pickupCity, setPickupCity] = useState("");

    const [deliveryDepartments, setDeliveryDepartments] = useState<DepartmentDAO[]>([]);
    const [deliveryCities, setDeliveryCities] = useState<CityDAO[]>([]);
    const [deliveryDepartment, setDeliveryDepartment] = useState<{ id: string; name: string } | null>(null);
    const [deliveryCity, setDeliveryCity] = useState("");

    // Estados para alertas
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors } 
    } = useForm<ShipmentDTO>();

    const t = useTranslations();

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setPickupDepartments(data || []);
                setDeliveryDepartments(data || []);
            } catch (error) {
                console.error("Error al cargar departamentos:", error);
            }
        };
        loadDepartments();
    }, []);

    useEffect(() => {
        const loadPickupCities = async () => {
            if (pickupDepartment) {
                try {
                    const data = await fetchCities(pickupDepartment.id);
                    setPickupCities(data || []);
                } catch (error) {
                    console.error("Error al cargar ciudades de recogida:", error);
                }
            } else {
                setPickupCities([]);
            }
        };
        loadPickupCities();
    }, [pickupDepartment]);

    useEffect(() => {
        const loadDeliveryCities = async () => {
            if (deliveryDepartment) {
                try {
                    const data = await fetchCities(deliveryDepartment.id);
                    setDeliveryCities(data || []);
                } catch (error) {
                    console.error("Error al cargar ciudades de destino:", error);
                }
            } else {
                setDeliveryCities([]);
            }
        };
        loadDeliveryCities();
    }, [deliveryDepartment]);

    const handlePickupDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = pickupDepartments.find((dept) => dept.id === selectedId)?.name || "";
        setPickupDepartment({ id: selectedId, name: selectedName });
        setPickupCity("");
    };

    const handlePickupCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickupCity(event.target.value);
    };

    const handleDeliveryDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = deliveryDepartments.find((dept) => dept.id === selectedId)?.name || "";
        setDeliveryDepartment({ id: selectedId, name: selectedName });
        setDeliveryCity("");
    };

    const handleDeliveryCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDeliveryCity(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setIsImageUploaded(false);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedImage) {
            setAlertMessage('Por favor, selecciona una imagen.');
            setAlertType('error');
            setShowAlert(true);
            return;
        }

        try {
            startLoading();
            const uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
            setImageUrl(uploadedImageUrl);
            setValue('imageUrl', uploadedImageUrl);
            setIsImageUploaded(true);
            setAlertMessage('Imagen cargada correctamente.');
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            setAlertMessage('Error al cargar la imagen');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    const onSubmit: SubmitHandler<ShipmentDTO> = async (data) => {
        if (!isImageUploaded) {
            setAlertMessage('Por favor, carga la imagen primero.');
            setAlertType('error');
            setShowAlert(true);
            return;
        }

        if (!pickupDepartment || !pickupCity || !deliveryDepartment || !deliveryCity) {
            setAlertMessage('Por favor, selecciona departamento y ciudad para recogida y destino.');
            setAlertType('error');
            setShowAlert(true);
            return;
        }

        // Convertir valores numéricos a números explícitamente
        data.weight = parseFloat(data.weight as unknown as string);
        data.dimensions = {
            height: parseFloat(data.dimensions?.height as unknown as string),
            width: parseFloat(data.dimensions?.width as unknown as string),
            length: parseFloat(data.dimensions?.length as unknown as string),
        };

        // Concatenar dirección final para recogida y destino usando el nombre del departamento
        data.pickupAddress = `${pickupDepartment.name}, ${pickupCity}, ${data.pickupAddress}`;
        data.deliveryAddress = `${deliveryDepartment.name}, ${deliveryCity}, ${data.deliveryAddress}`;

        try {
            startLoading();
            const response = await createShipment(data);

            if (response.shipment._id) {
                //setAlertMessage(response.message);
                setAlertMessage('El flete se creo exitosamente');
                setAlertType('success');
                setShowAlert(true);
                router.replace(`/user/shipments/me/${response.shipment._id}`);
            }
        } catch (error) {
            console.error('Error al crear el flete:', error);
            setAlertMessage('Error al crear el flete');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de título */}
            <div>
                <label htmlFor="title" className="block text-lg font-medium">{t('user.shipments.create.titleLabel')}</label>
                <div>
                    <input
                        {...register("title")}
                        className={`${standarInput} focus:outline-primary-400`}
                        placeholder={t('user.shipments.create.titlePlaceholder')}
                        type="text"
                        id="title"
                    />
                </div>
            </div>


            {/* Campos de dirección */}
            <div>
                <label htmlFor="address" className="block text-lg font-medium">{t('user.shipments.create.address')}</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                </div>
            </div>

            {/* Selectores de departamento y ciudad para recogida */}
            <div className="space-y-4">
                <label htmlFor="pickupLocation" className="block text-lg font-medium">{t('user.shipments.create.pickupLocation')}</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="pickupDepartment" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.pickupDepartment')}</label>
                        <select
                            id="pickupDepartment"
                            value={pickupDepartment?.id || ""}
                            onChange={handlePickupDepartmentChange}
                            className={`${standarInput} focus:outline-primary-400`}
                        >
                            <option value="">{t('user.shipments.create.selectDepartment')}</option>
                            {pickupDepartments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.pickupCity')}</label>
                        <select
                            id="pickupCity"
                            value={pickupCity}
                            onChange={handlePickupCityChange}
                            className={`${standarInput} focus:outline-primary-400`}
                            disabled={!pickupDepartment}
                        >
                            <option value="">{t('user.shipments.create.selectCity')}</option>
                            {pickupCities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.pickupAddress')}</label>
                    <input
                        {...register("pickupAddress")}
                        className={`${standarInput} focus:outline-primary-400`}
                        placeholder="Direccion de recogida..."
                        type="text"
                        id="pickupAddress"
                    />
                </div>
            </div>

            
            <div className="space-y-4">
                <label htmlFor="deliveryLocation" className="block text-lg font-medium">{t('user.shipments.create.deliveryLocation')}</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="deliveryDepartment" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.deliveryDepartment')}</label>
                        <select
                            id="deliveryDepartment"
                            value={deliveryDepartment?.id || ""}
                            onChange={handleDeliveryDepartmentChange}
                            className={`${standarInput} focus:outline-primary-400`}
                        >
                            <option value="">{t('user.shipments.create.selectDepartment')}</option>
                            {deliveryDepartments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.deliveryCity')}</label>
                        <select
                            id="deliveryCity"
                            value={deliveryCity}
                            onChange={handleDeliveryCityChange}
                            className={`${standarInput} focus:outline-primary-400`}
                            disabled={!deliveryDepartment}
                        >
                            <option value="">{t('user.shipments.create.selectCity')}</option>
                            {deliveryCities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">{t('user.shipments.create.deliveryAddress')}</label>
                    <input
                        {...register("deliveryAddress")}
                        className={`${standarInput} focus:outline-primary-400`}
                        placeholder="Direccion de entrega..."
                        type="text"
                        id="deliveryAddress"
                    />
                </div>

            </div>

            {/* Selectores de departamento y ciudad para destino */}

            <div>
                <label htmlFor="dimensions" className="block text-lg font-medium">
                    {t('user.shipments.create.dimensions')}
                </label>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            {t('user.shipments.create.weight')}
                        </label>
                        <QuantityInput
                            id="weight"
                            name="weight"
                            setValue={setValue}
                            watch={watch}
                            min={1}
                            step={1}
                        />
                    </div>

                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                            {t('user.shipments.create.height')}
                        </label>
                        <QuantityInput
                            id="height"
                            name="dimensions.height"
                            setValue={setValue}
                            watch={watch}
                            min={1}
                            step={1}
                        />
                    </div>

                    <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                            {t('user.shipments.create.width')}
                        </label>
                        <QuantityInput
                            id="width"
                            name="dimensions.width"
                            setValue={setValue}
                            watch={watch}
                            min={1}
                            step={1}
                        />
                    </div>

                    <div>
                        <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                            {t('user.shipments.create.length')}
                        </label>
                        <QuantityInput
                            id="length"
                            name="dimensions.length"
                            setValue={setValue}
                            watch={watch}
                            min={1}
                            step={1}
                        />
                    </div>
                </div>
            </div>
            
            <div>
                <label htmlFor="description" className="block text-lg font-medium">{t('user.shipments.create.description')}</label>
                <textarea
                    {...register("description")}
                    className={`${standarInput} focus:outline-primary-400`}
                    placeholder="Descripcion..."
                    rows={3}
                    id="description"
                ></textarea>
            </div>

            <div>
                <label htmlFor="image" className="block text-lg font-medium">{t('user.shipments.create.image')}</label>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {selectedImage ? (
                        <>
                            <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Imagen seleccionada"
                            className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImage(null); // Elimina la imagen seleccionada
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                            >
                              ✖ 
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">{t('user.shipments.create.clickToUpload')}</span> {t('user.shipments.create.orDragAndDrop')}
                            </p>
                            <p className="text-xs text-gray-500">{t('user.shipments.create.imageFormats')}</p>
                        </div>
                    )}
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange}/>
                </label>

                {/* Botón para cargar la imagen */}
                <div className="mt-2">
                    <CustomButton
                        text={isImageUploaded ? t('user.shipments.create.imageUploaded') : t('user.shipments.create.uploadImage')}
                        variant='secondary'
                        type='button'
                        onClick={handleUploadImage}
                        disabled={!selectedImage || isImageUploaded} // Deshabilita si no hay imagen o ya está cargada
                    />
                </div>
            </div>

            <div className="mt-4">
                <CustomButton
                        text={t('user.shipments.create.continue')}
                        variant='secondary'
                        type='submit'
                        disabled={!isImageUploaded}
                />
            </div>
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </form>
    );
}