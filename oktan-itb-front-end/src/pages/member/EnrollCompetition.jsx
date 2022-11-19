import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormEnrollItem, { CardUpload, EnrollProfile, FormEnrollNew, FormEnrollUpdate, Requirements } from '../../components/enrollment/FormEnrollItem'
import Spinner from '../../components/loadings/Spinner'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useCreateEmptyCompetitionsMutation, useGetCompetitionByIdQuery } from '../../features/competitions/competitionSlice'
import { usePostEmpyEnrollMutation, useUpdateEnrollMutation, useUploadEnrollCardMutation } from '../../features/competitions/enrollSlice'
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'


const EnrollCompetition = () => {
    const { id } = useParams()
    const profile = useSelector(selectCurrentProfile)

    const [editState, setEditState] = useState(false)
    const [uploadState, setUploadState] = useState(false)

    const {
        data: participant,
        isLoading: isParLoading,
        error: isParError,
        refetch,
        isFetching
    } = useGetParticipantByIdQuery({ competitionId: id, memberId: profile.id })


    const [newEnroll, { isLoading: createLoading, isError: createError, isSuccess: createSuccess }] = usePostEmpyEnrollMutation()

    const [updateEnroll, { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess }] = useUpdateEnrollMutation()

    const [uploadCard, { isLoading: uploadLoading, isError: uploadError, isSuccess: uploadSuccess }] = useUploadEnrollCardMutation()

    useEffect(() => {
        if (createSuccess && updateSuccess && uploadSuccess) {
            toast.success('Berhasil mendaftar!')
            refetch()
        }

        if (createError && updateSuccess && uploadSuccess) {
            toast.error('Gagal menambahkan data')
        }

        if (updateSuccess && !uploadSuccess) {
            toast.success('Berhasil menyimpan data!')
            refetch()
        }

        if (!updateSuccess && uploadSuccess) {
            toast.success('Berhasil memperbaharui file!')
            setUploadState(false)
            refetch()
        }

    }, [createSuccess, updateSuccess, uploadSuccess, createError, updateError, uploadError])

    const onNewEnroll = async (data) => {
        const formData = new FormData()
        formData.append('file', data.file[0])

        try {
            await newEnroll({ competitionId: id, memberId: profile.id }).unwrap()
            await updateEnroll({ competitionId: id, memberId: profile.id, body: data })
            await uploadCard({ competitionId: id, memberId: profile.id, body: formData })
        } catch (error) {
            toast.error(error.message)
        }

    }

    const onUpload = async (data) => {
        const formData = new FormData()
        formData.append('file', data.file[0])

        try {
            await uploadCard({ competitionId: id, memberId: profile.id, body: formData })
        } catch (error) {
            toast.error(error.message)
        }

    }


    const onUpdate = async (data) => {
        try {
            await updateEnroll({ competitionId: id, memberId: profile.id, body: data })
        } catch (error) {
            toast.error(error.message)
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
                        isLoading={updateLoading}

                    /> : null}

                {participant.isEnrolled && !editState && uploadState ?
                    <CardUpload
                        onCancel={(e) => {
                            e.preventDefault()
                            setUploadState(false)
                        }}
                        onSubmit={onUpload}
                        isLoading={uploadLoading}
                    />
                    : null
                }




                {!participant.isEnrolled ?
                    <FormEnrollNew
                        onSubmit={onNewEnroll}
                        participantData={participant.enroll}
                        memberData={participant.member}
                        competitionData={participant.competition}
                        isLoading={createLoading || uploadLoading || updateLoading}

                    /> : null}
                <div className='lg:col-span-4  p-2'>
                    <Requirements requirement={participant.competition.precations} />

                </div>
            </div>



        </div>
    )
}

export default EnrollCompetition