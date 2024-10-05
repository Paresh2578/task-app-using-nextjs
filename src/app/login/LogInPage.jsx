"use client"

import LoadingSpinner from '@/components/LoadingSpinner';
import { LogIn } from '@/service/userService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React , {useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiLockPasswordFill } from "react-icons/ri";

export default function LogInPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    // clear all user information form local storage
    localStorage.clear();
  },[])

  const onSubmit = async (data) => {
    try{
       setLoading(true);
        let res = await LogIn(data);

        toast.success(res.data.message);
        
        //set user infomation in local storage
        localStorage.setItem("user", res.data.username);

        // reload page
        window.location.reload();

        router.replace("/");
     }catch(error){
        toast.error(error.response.data.message);
     }
     setLoading(false);
  };

  return (
    <div className="flex justify-center h-[80vh] items-center p-5">
      <div className="container xl:w-1/3 lg:w-1/2 sm:w-1/2 h-fit border p-5 rounded-xl shadow-lg bg-white">
        <p className="text-center text-xl font-bold">Log In</p>

        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
           
           {/* email */}
           <div>
            <label htmlFor="email" className="block text-sm text-black">Email <span className="text-red-600">*</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                {...register('email', {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format."
                  }
                })}
                className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password <span className="text-red-600">*</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                {...register('password', {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters."
                  },
                })}
                className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>

          <p className="text-end">Don't have an account? <Link href="/signup" className=" text-primary mb-1"> Register </Link> </p>

          {/* login button */}
          <div className="flex items-center justify-center mt-4">
            <button type="submit" className="bg-primary hover:bg-[#5e34ba] text-white font-bold py-2 px-4 rounded" disabled={loading}>
              { loading ? <LoadingSpinner/>  : "Log In"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
