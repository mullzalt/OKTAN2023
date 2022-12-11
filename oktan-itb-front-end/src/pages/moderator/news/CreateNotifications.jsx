import React from 'react'
import { io } from 'socket.io-client'
import { API_URL } from '../../../config';
import { useRef } from 'react';
import { useEffect } from 'react';



const CreateNotifications = () => {
    const socket = useRef()


    useEffect(() => {
        socket.current = io(API_URL)
    }, [])

    return (
        <div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

            <button className="btn btn-outline btn-accent" onClick={e => {
                e.preventDefault()


                socket.current.emit('sendNofication', {
                    senderId: 'asdf',
                    text: 'text',
                    receiverId: 'cfb9b864-c33b-4c41-a91e-072103c85d14'
                }, (callback) => {
                    console.log(callback)
                })
            }}>
                Button
            </button>
        </div>
    )
}

export default CreateNotifications