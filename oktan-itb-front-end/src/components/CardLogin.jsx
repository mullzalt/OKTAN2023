// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from '../services/auth/authApi';
// import { logOut, selectCurrentUser, setCredentials } from '../services/auth/authSlice';
// import { useGetMemberMeMutation } from '../services/memberService';
// import Spinner from './Spinner';

// const CardLogin = () => {
//     const [formData, setFormData] = useState({
//         identifier: '',
//         password: ''
//     })

//     const [errorMsg, setErrorMsg] = useState([])

//     const errResult = (key) => {
//         let param = errorMsg.map(a => a.param)
//         const check = param.includes(key)
//         if (!check) return false

//         let index = param.indexOf(key)
//         let message = errorMsg.map(a => a.msg)[index]

//         return message
//     }


//     const user = useSelector(selectCurrentUser)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const [login, { isError, error, data, isLoading, isSuccess }] = useLoginMutation()

//     useEffect(() => {
//         if (user?.profile) navigate('/home')

//         if (isError) {
//             if (error.status === 401) {
//                 dispatch(setCredentials(error.data))
//                 navigate('/authentication/verify')
//             }

//             let errs = error.data?.msg ? [{ msg: error.data.msg, param: 'main' }] : error.data
//             setErrorMsg(errs)
//         }
//     }, [error, isError])

//     const onChange = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }))
//         setErrorMsg((prevErr) => [{}])
//     }



//     const onSubmit = async (e) => {
//         e.preventDefault()
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }))
//         const userData = await login({
//             identifier: formData.identifier,
//             password: formData.password
//         }).unwrap()

//         dispatch(setCredentials(userData.data))
//         navigate('/home')


//         // dispatch(setCredentials(userData.data))

//         // navigate('/home')

//     }



//     if (isLoading) {
//         return <Spinner />
//     }

//     return (
//         <div className="card shadow-2xl bg-base-100 mt-5">
//             <div className="card-body">
//                 <div className="card-title justify-center text-2xl">
//                     Sign In
//                 </div>
//                 <p>
//                     {errResult('main') ? (
//                         <div className="alert alert-error shadow-lg mt-5 mb-5">
//                             <div>
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                                 <span>{errResult('main')}</span>
//                             </div>
//                         </div>
//                     ) : null}
//                 </p>
//                 <form onSubmit={onSubmit}>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email or Username</span>
//                         </label>
//                         <input
//                             type="text"
//                             id='identifier'
//                             name='identifier'
//                             value={formData.identifier}
//                             onChange={onChange}
//                             placeholder="email/username"
//                             className={`input input-bordered ${errResult('identifier') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('identifier') ?
//                         (<p className='text-error'>{errResult('identifier')}</p>)
//                         : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Password</span>
//                         </label>
//                         <input
//                             type="password"
//                             id='password'
//                             name='password'
//                             value={formData.password}
//                             onChange={onChange}
//                             placeholder="password"
//                             className={`input input-bordered ${errResult('password') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('password') ? (<p className='text-error'>{errResult('password')}</p>) : null}


//                     <div className="form-control mt-4">
//                         <button className="btn btn-primary" type='submit'>Login</button>
//                         <div className="flex justify-between label mt-3">
//                             <Link to={"/register"} className="label-text-alt link link-hover">Don't have an account? Register</Link>
//                             <Link to={"/register"} className="label-text-alt link link-hover">Forgot Password</Link>
//                         </div>
                        
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CardLogin;