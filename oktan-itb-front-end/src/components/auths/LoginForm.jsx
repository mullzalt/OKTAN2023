import React, { useState, useEffect, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useLoginMutation } from '../../features/auth/authApiSlice'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'
import Spinner from '../Spinner'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const schema = yup.object({
    identifier: yup.string().required('username or email cannot be empty'),
    password: yup.string().required('please enter your password')
}).required()



const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false);
    const [showError, setShowError] = useState(false)

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const { control, watch, resetField, handleSubmit, formState: { errors }, setFocus } = useForm({
        defaultValues: {
            identifier: '',
            password: ''
        },
        resolver: yupResolver(schema)
    })

    const [login, { isLoading, error, isError, isSuccess, data }] = useLoginMutation()

    const token = useSelector(selectCurrentToken)


    useEffect(() => {
        setFocus('identifier')
        if (token) {
            navigate('/dashboard', { replace: false })
        }

        if (isSuccess) {
            dispatch(setCredentials({ user: data.user, accessToken: data.accessToken, profile: data.profile }))
            navigate('/dashboard', { replace: false })
        }

        if (isError) {
            if (error.status === 403) {
                dispatch(setCredentials({ ...error.data }))
                navigate('/verifyemail', { replace: true })
            }

            setShowError(true)
            resetField('password')
        }

    }, [token, error, isError, isSuccess, setFocus, resetField, dispatch, navigate, data])

    const onSubmit = async (data) => {
        try {
            const userData = await login(data)
        } catch (error) {

        }
    }

    const onFormChange = () => {
        setShowError(false)
    }



    if (isLoading) return <Spinner />


    return (
        <div className="card shadow-2xl bg-base-100 mt-5">
            <div className="card-body">
                <div className="card-title justify-center text-2xl">
                    Sign In
                </div>

                {showError ?
                    (<div className="alert alert-error shadow-lg my-3 justify-center">
                        <div className='font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error?.data?.message}</span>
                        </div>
                    </div>)
                    : null}

                <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
                    <label className="label">
                        <span className="label-text">Email or Username</span>
                    </label>
                    <Controller
                        name="identifier"
                        control={control}
                        render={({ field }) =>
                            <input
                                {...field}
                                className={`input input-bordered ${errors.identifier ? 'input-error' : ''}`}
                                onChange={e => {
                                    onFormChange()
                                    field.onChange(e)
                                }}
                                placeholder='username/email' />}
                    />
                    <p className='text-error mt-1'>{errors.identifier?.message}</p>

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
                                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                    type={passwordShown ? 'text' : 'password'}
                                    placeholder='password'
                                    onChange={e => {
                                        onFormChange()
                                        field.onChange(e)
                                    }} />}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-sm leading-5">
                            <button type='button' onClick={togglePasswordVisiblity} className='text-2xl btn btn-ghost btn-circle'>
                                {passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>
                    </div>
                    <p className='text-error mt-1'>{errors.password?.message}</p>

                    <div className="form-control mt-4">
                        <input className="btn btn-primary" type='submit' value='Login' />
                        <div className="flex justify-between label mt-3">
                            <Link to={"/register"} className="label-text-alt link sm:text-sm">Don't have an account? Register</Link>
                            <Link to={"/register"} className="label-text-alt link sm:text-sm">Forgot Password</Link>
                        </div>

                    </div>


                </form>


            </div>
        </div>
    )
}

export default LoginForm