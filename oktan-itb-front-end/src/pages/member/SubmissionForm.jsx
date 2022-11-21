import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InfoIsotermUpload from '../../components/competitions/InfoIsotermUpload'
import { FormButton } from '../../components/editor/FormActions'
import Spinner from '../../components/loadings/Spinner'
import { FileContainer, StatusBadge, SubmissionFormItems } from '../../components/submissons/SubmissionsItems'
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice'
import { useCreatePaperMutation, useGetPapersByParIdQuery, useUpdatePaperMutation, useUploadPaperMutation } from '../../features/competitions/submissionSlice'

const SubmissionForm = () => {
    const navigate = useNavigate()
    const { competitionId, memberId } = useParams()

    const [state, setState] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    })


    const {
        data,
        isLoading,
        error,
        refetch,
        isFetching
    } = useGetParticipantByIdQuery({ competitionId: competitionId, memberId: memberId })

    useEffect(() => {
        if (state.isSuccess) {
            toast.success(state.message)
            refetch()
        }

        if (state.isError) {
            toast.error(state.message)
        }
    }, [state])

    const [createPaper] = useCreatePaperMutation()
    const [updatePaper] = useUpdatePaperMutation()
    const [uploadPaper] = useUploadPaperMutation()

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Spinner message={'Terjadi kesalahan silahkan muat ulang...'} />
    }

    if (isLoading || isFetching) {
        return <Spinner />
    }


    const handleSubmitNew = async (paper) => {
        const formData = new FormData()
        formData.append('file', paper.file[0])

        setState(prev => ({
            ...prev,
            isLoading: true,
        }))


        try {
            await createPaper({ participantId: data.enroll.id }).unwrap()
            await updatePaper({ participantId: data.enroll.id, body: paper }).unwrap()
            await uploadPaper({ participantId: data.enroll.id, body: formData }).unwrap()

            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: 'Berhasil mengirimkan karya ilmiah!'
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


    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 xl:col-span-1">
                    <InfoIsotermUpload />
                </div>
                <div className="col-span-2 xl:col-span-1">
                    {!data.isSubmitted &&
                        <SubmissionFormItems onSubmit={handleSubmitNew} competitionData={data.competition}>
                            <FormButton type={'button'} className={'btn btn-error text-white '}
                                onClick={() => { navigate(-1) }}
                            >
                                Cancel
                            </FormButton>
                            <FormButton type={'submit'} className={'btn btn-primary'} isLoading={state.isLoading}>Kirim</FormButton>

                        </SubmissionFormItems>
                    }

                    {data.isSubmitted &&
                        <SubmissionFormItems
                            title={'Informasi Karya Ilimiah'}
                            readOnly={true}
                            competitionData={data.competition}
                            submissionData={data.submission}
                            fileContainer={<FileContainer participantId={data.enroll.id} />}
                        >
                            <StatusBadge status={data.submission?.status} />
                            <FormButton type={'button'} className={'btn btn-error text-white '}
                                onClick={() => { navigate(-1) }}
                            >
                                Cancel
                            </FormButton>

                        </SubmissionFormItems>
                    }

                </div>

            </div>

        </div>
    )
}

export default SubmissionForm