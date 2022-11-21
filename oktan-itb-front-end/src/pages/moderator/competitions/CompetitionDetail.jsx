import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/loadings/Spinner'
import { CompetitionForm, ParticipantTable } from '../../../components/moderator'
import { useGetCompetitionByIdQuery } from '../../../features'
import { useSaveCompetitionMutation, useToogleArchiveCompetitionsMutation } from '../../../features/competitions/competitionSlice'

const CompetitionDetail = () => {
    const { id } = useParams()

    const { data, isLoading, isError, isFetching, refetch } = useGetCompetitionByIdQuery({ id: id })
    const [saveCompetition, { data: saveData, isSuccess: isSaveSuccess, isError: isSaveError, isLoading: isSaveLoading }] = useSaveCompetitionMutation()

    const [setCompetitionArchive, { isLoading: arcLoading, isSuccess: arcSuccess }] = useToogleArchiveCompetitionsMutation()

    const onSave = async (dataToSave) => {
        try {
            await saveCompetition({ id: id, body: dataToSave })
        } catch (error) {
            toast.error('Gagal memperbaharui data: ' + error.message)
        }
    }

    const onPublish = async (e) => {
        e.preventDefault()
        try {
            await setCompetitionArchive({ id: id })
        } catch (error) {
            toast.error('Gagal memgubah arsip data: ' + error.message)
        }
    }

    useEffect(() => {

        if (isSaveError) {
            toast.error('Gagal memperbaharui data')
            refetch()
        }

        if (isSaveSuccess) {
            toast.success('Berhasil memperbaharui kompetisi')
            refetch()
        }

        if (arcSuccess) {
            toast.success('Berhasil')
            refetch()
        }

        return

    }, [isSaveSuccess, refetch, saveData, arcSuccess])

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
            <CompetitionForm competition={data} onSave={onSave} publishHandle={onPublish} />
        </div>
    )
}

export default CompetitionDetail