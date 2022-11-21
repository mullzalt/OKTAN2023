import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StatusBadge } from '../../../components/competitions/CompetitionDetail'
import { RichTextEditor } from '../../../components/editor'
import { ActionsForm, EnrollProfile } from '../../../components/enrollment/FormEnrollItem'
import Spinner from '../../../components/loadings/Spinner'
import { useVerifyEnrollMutation } from '../../../features/competitions/enrollSlice'
import { useGetParticipantByIdQuery } from '../../../features/competitions/participantSlice'

const ParticipantDetail = () => {
    const { id, memberId } = useParams()
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch } = useGetParticipantByIdQuery({ competitionId: id, memberId: memberId })

    const [verifyEnroll, {
        data: verifyData,
        isLoading: isVerifyLoading,
        isError: isVerifyError,
        isSuccess: isVerifySuccess,
        error: verifyError }]
        = useVerifyEnrollMutation()

    useEffect(() => {
        if (isVerifyError) {
            toast.error('Gagal memverivikasi peserta: ' + verifyError.data.message)
            refetch()
        }

        if (isVerifySuccess) {
            toast.success('Berhasil memverivikasi status peserta ')
            refetch()
            navigate(-1)

        }
    }, [isVerifyError, isVerifySuccess, verifyError, navigate])


    if (isLoading || isVerifyLoading || isFetching) {
        return <Spinner />
    }

    const handleAction = async (action) => {
        try {
            const verify = verifyEnroll({ competitionId: id, memberId: data.member.id, body: action }).unwrap
        } catch (error) {

        }
    }


    return (
        <div>
            <div className='lg:col-span-8  p-2'>
                <EnrollProfile enrollData={data.enroll} fileUrl={data.file} memberData={data.member}>
                    <StatusBadge data={data.enroll} />
                </EnrollProfile>

            </div>

            <div className='lg:col-span-4 card shadow-2xl mt-12'>
                <div className="card-body">

                    <ActionsForm
                        onClick={handleAction}
                    />

                </div>
            </div>
        </div>
    )
}

export default ParticipantDetail