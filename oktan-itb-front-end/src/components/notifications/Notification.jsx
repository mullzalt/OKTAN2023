import React from 'react'
import { BiBell } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { useGetNotificationsByMemberIdQuery } from '../../features/notifications/notificationsSlice'
import { RichTextEditor } from '../editor'


export const NotificationLog = (props) => {

}

export const NotificationWrapper = props => {
    const { data, isLoading, isError, refecth } = useGetNotificationsByMemberIdQuery({ memberId: props.memberId, params: { about: props.about || '' } })

    if (isLoading) {
        return props.children
    }
    return (
        <div className="indicator">
            <span className="indicator-item badge badge-secondary">1</span>
            {props.children}
        </div>
    )
}

export const NotificationIndicator = props => {
    const {
        data,
        isLoading,
        isError,
        refecth } = useGetNotificationsByMemberIdQuery({
            memberId: props.memberId, params: { about: props.about || '' }
        }, {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        })

    if (isLoading) {
        return props.children
    }

    const errorMessage = () => {
        let warnMsg = []

        data.map(msg => {
            if (msg.type === 'WARNING' || msg.type === 'DENIED') {
                warnMsg.push({ message: msg.message })
            }
        })

        return warnMsg
    }

    const newMessage = () => {
        let successMsg = []
        data.map(msg => {
            if (msg.type === 'NEW') {
                successMsg.push({ message: msg.message })
            }
        })

        return successMsg
    }




    return (
        <>


            {errorMessage().length > 0
                ? <span className="badge badge-secondary">{errorMessage().length}</span>
                : null
            }

            {newMessage().length > 0
                ? <span className="badge badge-success text-white">NEW</span>
                : null
            }



        </>
    )
}

const Notification = ({ memberId }) => {
    const {
        data,
        isLoading,
        isError,
        refecth } = useGetNotificationsByMemberIdQuery({ memberId: memberId, params: { about: '' } }, {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        })

    const EmptyNotif = () => {
        return (
            <li className=' text-lg font-thin'>Belum ada pesan</li>
        )
    }

    if (isLoading) {
        return (
            <div className="indicator">
                <BiBell className='text-xl' />
            </div>
        )
    }


    return (
        <div className='dropdown dropdown-start '>
            <label tabIndex={1} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <BiBell className='text-xl' />
                    {
                        data.length > 0
                            ?

                            <span className="badge badge-sm indicator-item badge-error text-white">{data.length}</span>
                            : null
                    }

                </div>

            </label>
            <ul tabIndex={1} className="top-10  right-0 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-44 lg:w-96 divide-y">
                {
                    data.length > 0
                        ? <li className='font-thin p-4'>Maaf, sementara pesan belum dapat ditampilkan</li>
                        : <EmptyNotif />
                }
            </ul>
        </div>

    )
}

export default Notification