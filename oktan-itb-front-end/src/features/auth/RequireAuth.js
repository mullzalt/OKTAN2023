import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { Layout } from '../../components/user'

import { useGetProfileQuery } from './authApiSlice'
import { selectCurrentToken, selectCurrentUser, setCredentials } from './authSlice'

const RequireAuth = ({ children, role }) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { data, isLoading, isError, isSuccess } = useGetProfileQuery()

  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ ...data, accessToken: token }))
    }
    return
  }, [isSuccess, data, token])

  const user = useSelector(selectCurrentUser)

  let matchRole

  if (!role) { matchRole = true }
  if (role === 'moderator') {
    (user.role === 'admin' || user.role === 'panitia')
      ? matchRole = true
      : matchRole = false
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    !isError
      ? matchRole
        ? <Layout><Outlet /></Layout>
        : <Navigate to="/dashboard" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />

  )
}

export default RequireAuth