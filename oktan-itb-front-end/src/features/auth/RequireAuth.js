import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { Layout } from '../../components/user'

import { useGetProfileQuery } from './authApiSlice'
import { selectCurrentToken, selectCurrentUser, setCredentials } from './authSlice'

import { io } from 'socket.io-client'
import { API_URL } from '../../config';
import { useRef } from 'react';

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const socket = useRef()

  const { data, isLoading, isError, isSuccess } = useGetProfileQuery({}, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })


  const token = useSelector(selectCurrentToken)
  let matchRole

  useEffect(() => {
    if (isSuccess) {
      socket.current = io(API_URL)
      dispatch(setCredentials({ ...data, accessToken: token }))
      socket.current.emit('addUser', data.user.id)
      socket.current.on('getUsers', (users) => {
        console.log(users)
      })

    }
    return
  }, [isSuccess, data, token])






  if (isLoading) {
    return <Spinner />
  }

  return (
    !isError
      ? <Layout><Outlet /></Layout>
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth