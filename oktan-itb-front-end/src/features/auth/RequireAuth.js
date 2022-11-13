import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { Layout } from '../../components/user'

import { useGetProfileQuery } from './authApiSlice'
import { selectCurrentToken, setCredentials } from './authSlice'

const RequireAuth = ({children}) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const {data, isLoading, isError, isSuccess} = useGetProfileQuery()
    
  const token = useSelector(selectCurrentToken) 



  useEffect(() => {
    if(isSuccess){
      dispatch(setCredentials({...data, accessToken: token}))
    }
    return
  }, [isSuccess, data, token])

  if(isLoading){
    return <Spinner/>
  }

  return (
    !isError 
        ? <Layout><Outlet/></Layout>
        : <Navigate to="/login" state={{from: location}} replace/>
        
  )
}

export default RequireAuth