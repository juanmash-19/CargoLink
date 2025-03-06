import { standarInput } from "@/utils/Tokens";
import Link from "next/link";
import CustomButton from "@/components/atoms/CustomButton";

export default function UserPage(){
    return(
        <div className="flex">

            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">

                    <div className="col-span-2 hidden sm:block text-gray-800">
                        <ul>
                            <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Cuenta</li>
                            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billetera</li>
                            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Notificaciones</li>
                        </ul>
                    </div>

                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold text-gray-800">Configuracion de Cuenta</h1>
                            <p className="font- text-slate-600">Desde aquí puede cambiar su contraseña o correo.</p>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-gray-800">Correo</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">Su direccion de correo es <strong>john.doe@company.com</strong></p>
                            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Cambiar</button>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-gray-800">Contraseña</p>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <label htmlFor="login-password">
                                    <span className="text-sm text-gray-500">Contraseña actual</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-password" className={`${standarInput} focus:outline-primary-300`} placeholder="***********" />
                                    </div>
                                </label>
                                <label htmlFor="login-password">
                                    <span className="text-sm text-gray-500">Nueva contraseña</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-new-password" className={`${standarInput} focus:outline-primary-300`} placeholder="***********" />
                                    </div>
                                </label>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <p className="mt-2 text-slate-600">No recuerdo mi contraseña. <Link className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recuperar cuenta</Link></p>
                        <div className="">

                        </div>
                        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Guardar contraseña</button>
                        <hr className="mt-4 mb-8" />

                        <div className="mb-10">
                            <p className="py-2 text-xl font-semibold text-gray-800">Borrar cuenta</p>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Proceed with caution
                            </p>
                            <p className="mt-2 text-slate-600">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                            <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        

    );
}