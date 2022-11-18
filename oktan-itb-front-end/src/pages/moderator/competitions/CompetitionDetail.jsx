import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/loadings/Spinner'
import { CompetitionForm, ParticipantTable } from '../../../components/moderator'
import { useGetCompetitionByIdQuery } from '../../../features'
import { useSaveCompetitionMutation } from '../../../features/competitions/competitionSlice'

const CompetitionDetail = () => {
    const { id } = useParams()

    const { data, isLoading, isError, isFetching, refetch } = useGetCompetitionByIdQuery({ id: id })
    const [saveCompetition, { data: saveData, isSuccess: isSaveSuccess, isError: isSaveError, isLoading: isSaveLoading }] = useSaveCompetitionMutation()



    const onSave = async (dataToSave) => {
        try {
            await saveCompetition({ id: id, body: dataToSave })
        } catch (error) {
            toast.error('Gagal memperbaharui data: ' + error.message)
        }
    }

    useEffect(() => {

        if (isSaveLoading) {
            console.log('loading')
            toast.warn('Tunggu ya..')
        }

        if (isSaveError) {
            toast.error('Gagal memperbaharui data')
            refetch()
        }

        if (isSaveSuccess) {
            toast.success('Berhasil memperbaharui kompetisi')
            refetch()
        }

        return

    }, [isSaveSuccess, refetch, saveData])

    if (isLoading) {
        return <Spinner message={"Sedang memproses..."} />
    }


    return (
        <div>
            <div className="mb-4">
                <div className="pb-3">
                    <h2 className='font-bold text-xl'>{data.category}</h2>
                    <p className='font-semibold text-l'>{data.title}</p>
                </div>
                <hr />
            </div>
            <CompetitionForm competition={data} onSave={onSave} />
        </div>
    )
}

export default CompetitionDetail