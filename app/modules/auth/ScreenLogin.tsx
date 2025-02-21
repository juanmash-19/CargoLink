'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"

import CustomButton from '@/components/atoms/CustomButton';

import { standarInput } from '@/utils/Tokens';

type Inputs = {
    example: string,
    exampleTwo: string,
};
export default function ScreenLogin() {

    const {
        register,
        handleSubmit,
        watch, formState: { errors } 
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <section className="max-w-screen-sm mx-auto w-1/2">
      <div className="bg-slate-100 w-full mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-sm font-bold">
                Sign in with
              </h6>
            </div>
            <div className="btn-wrapper text-center">
              <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center hover:font-bold text-xs ease-linear transition-all duration-150" type="button">
                <Image width={50} height={50} alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" /> Github
              </button>
              <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center hover:font-bold text-xs ease-linear transition-all duration-150" type="button" >
                <Image width={50} height={50} alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" /> Google
              </button>

            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              <small className=''>Or sign in with credentials</small>
            </div>
            <form>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                <input type="email" className={`${standarInput}`} placeholder="Email" />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                <input type="password" className={`${standarInput}`} placeholder="Password" />
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span>
                </label>
              </div>
              <div className="text-center mt-6">
                <CustomButton
                 text= 'Log In asfd'
                 color= 'bg-danger'
                 onClickButton={() => {}}
                 typeButton='submit'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}