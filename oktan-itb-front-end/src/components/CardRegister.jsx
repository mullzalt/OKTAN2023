// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useRegisterMutation } from '../services/auth/authApi';
// import { selectCurrentUser, setCredentials } from '../services/auth/authSlice';
// import Spinner from './Spinner';


// const CardRegister = () => {
//     const initFormData = {
//         name: '',
//         institute: '',
//         phone: '',
//         email: '',
//         username: '',
//         password: '',
//         confirmPassword: ''
//     }

//     const [formData, setFormData] = useState(initFormData)

//     const { name, institute, phone, email, username, password, confirmPassword } = formData

//     const resetFormData = {
//         name: name ? name : '',
//         institute: institute ? institute : '',
//         phone: phone ? phone : '',
//         email: email ? email : '',
//         username: username ? username : '',
//         password: '',
//         confirmPassword: ''
//     }

//     const user = useSelector(selectCurrentUser)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const [formErrors, setFormErrors] = useState([])

//     const errResult = (input) => {
//         let param = formErrors.map(a => a.param)
//         const check = param.includes(input)
//         if (!check) return false

//         let index = param.indexOf(input)
//         let message = formErrors.map(a => a.msg)[index]

//         return message
//     }

//     const [register, {isError, error, data, isLoading, isSuccess} ] = useRegisterMutation()

//     useEffect(() => {
//         if(user?.verifed) navigate('/home')

//         if(isError){
//             let errs = error.data?.msg ? [{msg: error.data.msg, param: 'main'}] : error.data
//             setFormErrors(errs)
//         }
//     }, [user, error, isError])

//     const onChange = (e) => {
//         setFormErrors([])
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     const onSubmit = async(e) => {
//         e.preventDefault()
//         const userData = {
//             name,
//             institute,
//             phone,
//             email,
//             username,
//             password,
//             confirmPassword
//         }
//         const result = await register(userData).unwrap()
//         dispatch(setCredentials(result.data))
//         navigate('/authentication/verify')
//     }

//     if (isLoading) {
//         return <Spinner />
//     }

//     return (
//         <div className="card shadow-2xl bg-base-100 mt-5">
//             <div className="card-body">
//                 <div className="card-title justify-center text-2xl">
//                     Register
//                 </div>

//                 <form onSubmit={onSubmit}>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Nama Lengkap</span>
//                         </label>
//                         <input
//                             type="text"
//                             id='name'
//                             name='name'
//                             onChange={onChange}
//                             value={name}
//                             placeholder="Nama Lengkap"
//                             className={`input input-bordered ${errResult('name') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('name') ? (<p className='text-error'>{errResult('name')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Asal Sekolah / Institut</span>
//                         </label>
//                         <input
//                             type="text"
//                             id='institute'
//                             name='institute'
//                             onChange={onChange}
//                             value={institute}
//                             placeholder="Asal sekolah/institut"
//                             className={`input input-bordered ${errResult('institute') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('institute') ? (<p className='text-error'>{errResult('institute')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">No Telp / Hp</span>
//                         </label>
//                         <input
//                             type="text"
//                             id='phone'
//                             name='phone'
//                             onChange={onChange}
//                             value={phone}
//                             placeholder="No Telfon"
//                             className={`input input-bordered ${errResult('phone') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('phone') ? (<p className='text-error'>{errResult('phone')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input
//                             type="email"
//                             id='email'
//                             name='email'
//                             onChange={onChange}
//                             value={email}
//                             placeholder="E-mail"
//                             className={`input input-bordered ${errResult('email') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('email') ? (<p className='text-error'>{errResult('email')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Username</span>
//                         </label>
//                         <input
//                             type="text"
//                             id='username'
//                             name='username'
//                             onChange={onChange}
//                             value={username}
//                             placeholder="Username"
//                             className={`input input-bordered ${errResult('username') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('username') ? (<p className='text-error'>{errResult('username')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Password</span>
//                         </label>
//                         <input
//                             type="password"
//                             id='password'
//                             name='password'
//                             onChange={onChange}
//                             value={password}
//                             placeholder="password"
//                             className={`input input-bordered ${errResult('password') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('password') ? (<p className='text-error'>{errResult('password')}</p>) : null}

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Confirm Password</span>
//                         </label>
//                         <input
//                             type="password"
//                             id='confirmPassword'
//                             name='confirmPassword'
//                             onChange={onChange}
//                             value={confirmPassword}
//                             placeholder="confirm password"
//                             className={`input input-bordered ${errResult('confirmPassword') ? ("input-error") : null}`} />
//                     </div>
//                     {errResult('confirmPassword') ? (<p className='text-error'>{errResult('confirmPassword')}</p>) : null}
//                     <div className="form-control mt-4">
//                         <button className="btn btn-primary">Register</button>
//                         <label className="label mt-3 justify-center">
//                             <Link to={"/login"} href="#" className="label-text-alt link link-hover">Already have an account? Login</Link>
//                         </label>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CardRegister;