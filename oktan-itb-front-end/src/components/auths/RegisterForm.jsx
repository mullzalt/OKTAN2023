import React, { useState, useEffect, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'
import Spinner from '../Spinner'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

const phoneRegExp = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g
const usernameRegExp = /^[a-zA-Z0-9.\-_$@*!]{0,20}$/g

const schema = yup.object({
    name: yup.string().required('name cannot be empty'),
    institute: yup.string().required('institute/school cannot be empty'),
    phone: yup.string().matches(phoneRegExp, 'must be a valid phone number'),
    email: yup.string().email('Must enter a valid email').required('Please enter an email'),
    username: yup.string()
        .matches(usernameRegExp, 'Username cannot contain space')
        .min(6, 'must be atleast 6 characters long').max(18, 'cannot exceed 18 characters')
        .required('username cannot be empty'),
    password: yup.string().required('please enter your password').min(6),  
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password not match')
}).required()


const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [passwordShown, setPasswordShown] = useState(false);
    const [showError, setShowError] = useState(false)

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    const {control, watch, resetField, reset, setError, handleSubmit, formState: {errors}, setFocus } = useForm({
        defaultValues: {
            name : '',
            institute : '',
            phone : '',
            email : '',
            username : '',
            password : '',
            confirmPassword : '',
        },
        resolver: yupResolver(schema),
        mode: 'onTouched'
    })

    const [register, {isLoading, error, isError, isSuccess}] = useRegisterMutation()
    
    const token = useSelector(selectCurrentToken)


    useEffect(() => {
        setFocus('name')
        if(token){
            navigate('/dashboard', {replace: false})
        }

        if(isSuccess){
            reset()
            navigate('/verifyemail', {replace: true})
        }

        if(isError){
            const errs = error?.data?.errors 
            ? error.data.errors 
            : []

            errs.map((err) => {
                setError(err.param, { type: 'manual', message: `${err.param}: ${err.value} already taken!`} ) 
            })

            setShowError(true)
            resetField('password')
            resetField('confirmPassword')
        }

    }, [token, error, isError, isSuccess, setFocus, resetField, setError])

    const onSubmit = async(data) => {
        try {
            const userData = await register(data)
            dispatch(setCredentials({...userData.data}))
        } catch (error) {
            
        }
    }

    const onFormChange = () => {
        setShowError(false)
    }

    

    if(isLoading) return <Spinner/>


  return (
    <div className="card shadow-2xl bg-base-100 mt-5">
        <div className="card-body">
            <div className="card-title justify-center text-2xl">
                Register
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='form-control'>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Identitas Diri</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    
                    
                    <label className="label">
                        <span className="label-text">Nama Lengkap</span>
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => 
                        <input 
                        {...field} 
                        className={`input input-bordered ${errors.name? 'input-error' : ''}`} 
                        onChange={e => {
                            onFormChange()
                            field.onChange(e)
                        }}
                        placeholder='nama lengkap'/>}
                    />
                    <p className='text-error mt-1'>{errors.name?.message}</p>

                    <label className="label">
                        <span className="label-text">Asal Sekolah/Institut</span>
                    </label>
                    <Controller
                        name="institute"
                        control={control}
                        render={({ field }) => 
                        <input 
                        {...field} 
                        className={`input input-bordered ${errors.institute? 'input-error' : ''}`} 
                        onChange={e => {
                            onFormChange()
                            field.onChange(e)
                        }}
                        placeholder='asal sekolah/institut'/>}
                    />
                    <p className='text-error mt-1'>{errors.institute?.message}</p>

                    <label className="label">
                        <span className="label-text">No telefon</span>
                    </label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => 
                        <input 
                        {...field} 
                        className={`input input-bordered ${errors.phone? 'input-error' : ''}`} 
                        onChange={e => {
                            onFormChange()
                            field.onChange(e)
                        }}
                        placeholder='asal sekolah/institut'/>}
                    />
                    <p className='text-error mt-1'>{errors.phone?.message}</p>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Identitas User</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => 
                        <input 
                        {...field} 
                        className={`input input-bordered ${errors.email? 'input-error' : ''}`} 
                        onChange={e => {
                            onFormChange()
                            field.onChange(e)
                        }}
                        placeholder='email'/>}
                    />
                    <p className='text-error mt-1'>{errors.email?.message}</p>

                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => 
                        <input 
                        {...field} 
                        className={`input input-bordered ${errors.username? 'input-error' : ''}`} 
                        onChange={e => {
                            onFormChange()
                            field.onChange(e)
                        }}
                        placeholder='username'/>}
                    />
                    <p className='text-error mt-1'>{errors.username?.message}</p>


                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <div className='relative'>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => 
                            
                            <input 
                            {...field}
                            className={`input input-bordered w-full ${errors.password? 'input-error' : ''}`} 
                            type={passwordShown? 'text' : 'password'}
                            placeholder='password'
                            onChange={e => {
                                onFormChange()
                                field.onChange(e)
                            }} />}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-sm leading-5">
                            <button type='button' onClick={togglePasswordVisiblity} className='text-2xl btn btn-ghost btn-circle'>
                                {passwordShown? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                            </button>
                        </div>
                    </div>

                    <p className='text-error mt-1'>{errors.password?.message}</p>
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <div className='relative'>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => 
                            
                            <input 
                            {...field}
                            className={`input input-bordered w-full ${errors.confirmPassword? 'input-error' : ''}`} 
                            type={passwordShown? 'text' : 'password'}
                            placeholder='password'
                            onChange={e => {
                                onFormChange()
                                field.onChange(e)
                            }} />}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-sm leading-5">
                            <button type='button' onClick={togglePasswordVisiblity} className='text-2xl btn btn-ghost btn-circle'>
                                {passwordShown? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                            </button>
                        </div>
                    </div>
                    <p className='text-error mt-1'>{errors.confirmPassword?.message}</p>

                    <div className="form-control mt-4">
                        <input className="btn btn-primary" type='submit' value='Register' />
                        <div className="flex justify-center label mt-3">
                            <Link to={"/login"} className="label-text-alt link ">Already have an account? Login</Link>
                        </div>
                        
                    </div>
  

                </form>


        </div>
    </div>
  )
}

export default RegisterForm