import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormEnrollItem, { CardUpload, EnrollProfile, FormEnrollNew, FormEnrollUpdate, MessagesContainer, Requirements } from '../../components/enrollment/FormEnrollItem'
import Spinner from '../../components/loadings/Spinner'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useCreateEmptyCompetitionsMutation, useGetCompetitionByIdQuery } from '../../features/competitions/competitionSlice'
import { usePostEmpyEnrollMutation, useUpdateEnrollMutation, useUploadEnrollCardMutation } from '../../features/competitions/enrollSlice'
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { StatusBadge } from '../../components/competitions/CompetitionDetail'
import { useSendInvoiceMutation } from '../../features/competitions/invoiceSlice'



const EnrollCompetition = () => {
    const { id } = useParams()
    const profile = useSelector(selectCurrentProfile)

    const [state, setState] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    })
    const [editState, setEditState] = useState(false)
    const [uploadState, setUploadState] = useState(false)

    const {
        data: participant,
        isLoading: isParLoading,
        error: isParError,
        refetch,
        isFetching
    } = useGetParticipantByIdQuery({ competitionId: id, memberId: profile.id })


    const [newEnroll, { isLoading: createLoading, isError: createError, isSuccess: createSuccess, error: createErr }] = usePostEmpyEnrollMutation()

    const [updateEnroll, { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess }] = useUpdateEnrollMutation()

    const [uploadCard, { isLoading: uploadLoading, isError: uploadError, isSuccess: uploadSuccess }] = useUploadEnrollCardMutation()

    const [invoiceSend, { isLoading: invoiceLoading, isError: invoiceError, isSuccess: invoiceSuccess }] = useSendInvoiceMutation()

    useEffect(() => {
        if (state.isSuccess) {
            toast.success(state.message)
            refetch()
        }

        if (state.isError) {
            toast.error(state.message)
        }


    }, [state])

    const onNewEnroll = async (data) => {
        const formData = new FormData()
        formData.append('file', data.file[0])

        try {
            setState(prev => ({
                ...prev,
                isLoading: true,
            }))

            if (data.isSendInvoice) {
                await invoiceSend({ competitionId: id, memberId: profile.id }).unwrap()
            }
            await newEnroll({ competitionId: id, memberId: profile.id }).unwrap()
            await updateEnroll({ competitionId: id, memberId: profile.id, body: data }).unwrap()
            await uploadCard({ competitionId: id, memberId: profile.id, body: formData }).unwrap()

            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: 'Berhasil melakukan pendaftaran!'
            }))
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: 'Terjadi kesalahan: ' + error.message
            }))
        }

    }

    const onUpload = async (data) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }))

        const formData = new FormData()
        formData.append('file', data.file[0])

        try {
            await uploadCard({ competitionId: id, memberId: profile.id, body: formData }).unwrap()

            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: 'Berhasil mengupload data!'
            }))
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: 'Terjadi kesalahan: ' + error.message
            }))
        }

    }


    const onUpdate = async (data) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }))

        try {
            await updateEnroll({ competitionId: id, memberId: profile.id, body: data })

            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: 'Berhasil memperbaharui profil!'
            }))
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: 'Terjadi kesalahan: ' + error.message
            }))
        }

    }

    if (isParLoading || isFetching) {
        return <Spinner message={'Sedang memuat data...'} />
    }

    return (
        <div>
            <div className='mb-4'>
                <h2 className='text-xl font-bold'>
                    {participant?.competition?.category}
                </h2>
                <p>{participant?.competition?.title}</p>
            </div>

            <div className="grid lg:grid-cols-12 lg:gap-4">
                {participant.isEnrolled && !editState && !uploadState ?
                    <EnrollProfile
                        enrollData={participant.enroll}
                        fileUrl={participant.file}
                        memberData={participant.member}
                        header={<StatusBadge data={participant.enroll} />}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setEditState(true)
                            }}
                            className='btn btn-info text-white'>Ubah Data Peserta</button>

                        <div className="tooltip" data-tip="Hanya upload ulang apabila diperintahkan untuk upload ulang!">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setUploadState(true)
                                }}
                                className='btn btn-warning'>Upload Ulang</button>
                        </div>
                    </EnrollProfile>
                    : null
                }

                {participant.isEnrolled && editState && !uploadState ?
                    <FormEnrollUpdate
                        onSubmit={onUpdate}
                        onCancel={(e) => {
                            e.preventDefault()
                            setEditState(false)
                        }}
                        participantData={participant.enroll}
                        memberData={participant.member}
                        competitionData={participant.competition}
                        isLoading={state.isLoading}

                    /> : null}

                {participant.isEnrolled && !editState && uploadState ?
                    <CardUpload
                        onCancel={(e) => {
                            e.preventDefault()
                            setUploadState(false)
                        }}
                        onSubmit={onUpload}
                        isLoading={state.isLoading}
                    />
                    : null
                }




                {!participant.isEnrolled ?
                    <FormEnrollNew
                        onSubmit={onNewEnroll}
                        participantData={participant.enroll}
                        memberData={participant.member}
                        competitionData={participant.competition}
                        isLoading={state.isLoading}

                    /> : null}


                <div className='lg:col-span-4  p-2'>
                    <Requirements requirement={participant.competition.precations} />
                    {participant?.messages.length > 0
                        ? participant.messages.map(msg => {
                            if (msg.message) {
                                return (
                                    <div className='mt-2'>
                                        <MessagesContainer header={'Pesan dari panitia'} value={msg.message} />
                                    </div>
                                )

                            }
                        })
                        : null}


                </div>
            </div>



        </div>
    )
}

export default EnrollCompetition