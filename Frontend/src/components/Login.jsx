import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "../context/Authprovider"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    console.log(userInfo);  // Log the submitted user data

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });

  };

  return (
    <>
      <div className='flex h-screen items-center justify-center bg-gradient-to-b from-teal-600 via-green-700 to-black'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md'>
          <h1 className='text-3xl text-center text-white mb-6'>
          Connectify<span className='text-teal-400 font-semibold'>Me</span>
          </h1>
          <h2 className='text-center text-xl text-white font-semibold mb-4'>Login</h2>

          {/* Email Field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow border-none p-3 rounded-lg bg-[#333] text-white" placeholder="Email" {...register("email", { required: true })} />
          </label>
          {errors.email && <span className='text-red-500 text-sm font-semibold'>This field is required</span>}

          {/* Password Field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow border-none p-3 rounded-lg bg-[#333] text-black" placeholder="Password" {...register("password", { required: true })} />
          </label>
          {errors.password && <span className='text-red-500 text-sm font-semibold'>This field is required</span>}

          {/* Login Button */}
          <div className='flex justify-between items-center'>
            <p className='text-white'>
              New User?
              <Link to="/signup" className="text-teal-400 ml-1 underline">Signup</Link>
            </p>
            <input type="submit" value="Login" className='bg-gradient-to-r from-teal-400 to-green-500 text-white p-3 rounded-lg cursor-pointer transition duration-300 hover:opacity-90' />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
