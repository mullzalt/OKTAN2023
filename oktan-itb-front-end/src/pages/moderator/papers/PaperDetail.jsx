import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormButton } from '../../../components/editor/FormActions'
import { EnrollProfile } from '../../../components/enrollment/FormEnrollItem'
import Spinner from '../../../components/loadings/Spinner'
import { FileContainer, ReviewActions, StatusBadge, SubmissionFormItems } from '../../../components/submissons/SubmissionsItems'
import { useGetParticipantByIdQuery } from '../../../features/competitions/participantSlice'
import { useRemovePaperMutation, useReviewPaperMutation } from '../../../features/competitions/submissionSlice'




const PaperDetail = () => {
    const navigate = useNavigate()
    const { competitionId, memberId } = useParams()

    const {
        data,
        isLoading,
        error,
        refetch,
        isFetching
    } = useGetParticipantByIdQuery({ competitionId: competitionId, memberId: memberId })

    const [review, { isSuccess: reviewSuccess }] = useReviewPaperMutation()
    const [remove] = useRemovePaperMutation()


    useEffect(() => {
        if (reviewSuccess) {
            toast.success('Paper berhasil dinilai!')
            refetch()
        }
    }, [reviewSuccess])


    const handleReview = async (rev) => {
        try {
            await review({ participantId: data.enroll.id, body: rev })
        } catch (error) {
            toast.error('Terjadi Kesalahan: ' + error.message)
        }
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 xl:col-span-1">
                    <SubmissionFormItems
                        title={`${data?.competition.category} : ${data?.competition.title}, oleh: ${data?.enroll.team_name}`}
                        readOnly={true}
                        competitionData={data.competition}
                        submissionData={data.submission}
                        fileContainer={<FileContainer participantId={data.enroll.id} />}
                    >
                        <StatusBadge status={data.submission?.status} />
                        <FormButton type={'button'} className={'btn btn-error text-white '}
                            onClick={() => { navigate(-1) }}
                        >
                            Back
                        </FormButton>

                    </SubmissionFormItems>
                </div>


                <div className="col-span-2 xl:col-span-1">
                    <EnrollProfile enrollData={data.enroll} fileUrl={data.file_url} memberData={data.member} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='col-span-2 card shadown-md'>
                    <div className="card-body">

                        <ReviewActions onSubmit={handleReview} />
                    </div>
                </div>
            </div>




        </div>
    )
}

export default PaperDetail