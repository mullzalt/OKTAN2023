import React, { Children } from 'react'
import CompetitionCardItems from '../../components/competitions/CompetitionCard'
import { useGetCompetitionsQuery } from '../../features'
import IsotermLogoImg from '../../assets/img/logo-isoterm.png'
import { useFormatDate } from '../../components/hooks/useFormatDate'
import { useSelector } from 'react-redux'
import Pulse from '../../components/loadings/Pulse'
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice'
import Spinner from '../../components/loadings/Spinner'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useGetPapersByParIdQuery } from '../../features/competitions/submissionSlice'
import { StatusBadge } from '../../components/submissons/SubmissionsItems'



const PaperStatus = ({ participantId }) => {
    const {
        data,
        isLoading,
        error,
    } = useGetPapersByParIdQuery({ participantId: participantId })

    if (isLoading) {
        return <>....</>
    }

    const isEmpty = Object.keys(data).length === 0


    return (
        <div>
            {isEmpty
                ? <div className='badge badge-outline  p-4 '>Belum Mengirimkan File</div>
                : data?.status ? <StatusBadge status={data.status}></StatusBadge> : null

            }
        </div>
    )
}


const Card = ({ id, children }) => {

    const profile = useSelector(selectCurrentProfile)

    const {
        data,
        isLoading,
        error,
    } = useGetParticipantByIdQuery({ competitionId: id, memberId: profile.id })


    const dateStart = useFormatDate(data?.competition.start_date)
    const dateEnd = useFormatDate(data?.competition.end_date)

    if (error) {
        return <Spinner message={'Terjadi kesalahan silahkan muat ulang...'} />
    }

    if (isLoading) {
        return <Pulse />
    }
    return (
        <div className="card  bg-base-100 shadow-xl">
            <h2 className="card-title font-bold mb-3 px-4 py-2 bg-primary text-white rounded">{data.competition.title}</h2>
            <div className="card-body ">
                <div className="grid grid-cols-6 w-full">
                    <img className='hidden md:block ' src={IsotermLogoImg} alt="Movie" />

                    <div className='col-span-6 md:col-span-5'>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 place-self-end">
                                <PaperStatus participantId={data.enroll.id} />

                            </div>
                        </div>


                        <div className="grid grid-cols-12">
                            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
                                Pembukaan Pengumpulan
                            </div>
                            <div className='col-span-12 md:col-span-9'>
                                {dateStart}
                            </div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
                                Deadline Pengumpulan
                            </div>
                            <div className='col-span-12 md:col-span-9'>
                                {dateEnd}
                            </div>

                        </div>

                        <div className="grid grid-cols-12">
                            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
                                Sub Tema
                            </div>
                            <div className='col-span-12 md:col-span-9'>
                                {data.competition.competition_sub_themes.map(theme => {
                                    return (
                                        <span className='badge badge-outline mr-2'>{theme.name}</span>
                                    )
                                })}
                            </div>
                        </div>

                    </div>


                </div>

            </div>

            <div className="card-actions justify-end p-4">
                {children}
                <Link to={data.competition.id + '/members/' + data.member.id + '/submit'}
                    className='btn btn-info text-white'>
                    {data.isSubmitted ? 'Periksa Kembali' : 'Kirimkan'}
                </Link>
            </div>
        </div>
    )
}




const SubmissionPage = () => {
    const notEnrolled = { where: '', drafted: false, enrolled: true, category: 'ISOTERM' }
    const { data: notEnroll, error: notEnrollError, isLoading: notEnrollLoading } = useGetCompetitionsQuery({ ...notEnrolled })


    return (
        <div>

            <h1 className='font-bold text-2xl my-2'>Lomba yang menyertakan Karya Ilmiah</h1>

            {
                notEnrollLoading ? <>...</> : notEnrollError ? <>Something went wrong</> :
                    notEnroll.length > 0 ? notEnroll.map(comp => {
                        return <Card id={comp.id}>


                        </Card>
                    }) : <span className='font-thin text-xl ml-5'>Tidak mengikuti lomba ISOTERM apapun...</span>
            }





        </div>
    )
}

export default SubmissionPage