'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "@/components/atoms/CustomButton";
import { standarInput } from "@/utils/Tokens";
import QuantityInput from '@/components/molecules/QuantityInput';
import { ShipmentDTO } from "@/Interfaces/shipment/ShipmentInterface";
import { useLoadingStore } from "@/store/LoadingSpinner";
import { createShipment, uploadImageToCloudinary } from "@/libs/ServiceShipment/api-shipment";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { envVariables } from "@/utils/config";

export default function FormCreateShip() {

    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { 
        register, 
        handleSubmit, 
        watch,
        setValue,
        formState: { errors } } 
        = useForm<ShipmentDTO>({

        });

    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
            if (file) {
                setSelectedImage(file);
                setIsImageUploaded(false); // Reinicia el estado al seleccionar una nueva imagen
            }
        };

    const handleUploadImage = async () => {
        if (!selectedImage) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        try {
            startLoading();
            const uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
            setImageUrl(uploadedImageUrl); // Almacena la URL de la imagen
            setValue('imageUrl', uploadedImageUrl); // Actualiza el valor en el formulario
            setIsImageUploaded(true); // Marca la imagen como cargada
            alert('Imagen cargada correctamente.');
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen');
        } finally {
            stopLoading();
        }
    };

    
    const onSubmit: SubmitHandler<ShipmentDTO> = async (data) => {
        if (!isImageUploaded) {
            alert('Por favor, carga la imagen primero.');
            return;
        }

        try {
            startLoading();
            const response = await createShipment(data);

            if (response._id) {
                alert(response.message);
                router.replace(`/user/shipments/me/${response._id}`);
            }
        } catch (error) {
            console.error('Error al crear el flete:', error);
            alert('Error al crear el flete');
        } finally {
            stopLoading();
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-lg font-medium">Titulo</label>
                <div>
                    <input
                    {...register("title")}
                    className={`${standarInput} focus:outline-primary-400`}
                    placeholder="titulo..."
                    type="text"
                    id="title"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-lg font-medium">Direcciones</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700">Direccion de recogida</label>
                        <input
                            {...register("pickupAddress")}
                            className={`${standarInput} focus:outline-primary-400`}
                            placeholder="Direccion de recogida..."
                            type="text"
                            id="pickupAddress"
                        />
                    </div>

                    <div>
                        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Direccion de entrega</label>
                        <input
                            {...register("deliveryAddress")}
                            className={`${standarInput} focus:outline-primary-400`}
                            placeholder="Direccion de entrega..."
                            type="text"
                            id="deliveryAddress"
                        />
                    </div>
                </div>
            </div>


            <div>
                <label htmlFor="address" className="block text-lg font-medium">Dimensiones</label>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                        <QuantityInput
                            id='weight'
                            name='weight'
                            register={register}
                        
                        />
                    </div>

                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">Alto (cm)</label>
                        <QuantityInput
                            id='height'
                            name='dimensions.height'
                            register={register}
                        
                        />
                    </div>

                    <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700">Ancho (cm)</label>
                        <QuantityInput
                            id='width'
                            name='dimensions.width'
                            register={register}
                        
                        />
                    </div>

                    <div>
                        <label htmlFor="length" className="block text-sm font-medium text-gray-700">Largo (cm)</label>
                        <QuantityInput
                            id='length'
                            name='dimensions.length'
                            register={register}

                        />
                    </div>
                </div>
            </div>
            
            <div>
                <label htmlFor="description" className="block text-lg font-medium">Descripcion</label>
                <textarea
                    {...register("description")}
                    className={`${standarInput} focus:outline-primary-400`}
                    placeholder="Descripcion..."
                    rows={3}
                    id="description"
                ></textarea>
            </div>

            <div>
                <label htmlFor="image" className="block text-lg font-medium">Imagen del flete</label>
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
                                <span className="font-semibold">Haga clic para cargar la imagen</span> o arrástrela y suéltela aquí
                            </p>
                            <p className="text-xs text-gray-500">SVG, PNG o JPG</p>
                        </div>
                    )}
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange}/>
                </label>

                {/* Botón para cargar la imagen */}
                <div className="mt-2">
                    <CustomButton
                        text={isImageUploaded ? 'Imagen cargada' : 'Cargar imagen'}
                        variant='secondary'
                        type='button'
                        onClick={handleUploadImage}
                        disabled={!selectedImage || isImageUploaded} // Deshabilita si no hay imagen o ya está cargada
                    />
                </div>
            </div>

            <div className="mt-4">
                <CustomButton
                        text='Continuar'
                        variant='secondary'
                        type='submit'
                        disabled={!isImageUploaded}
                />
            </div>
        </form>
    );
}