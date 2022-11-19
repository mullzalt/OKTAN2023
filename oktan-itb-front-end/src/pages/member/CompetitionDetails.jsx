import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CompetitionDetail, { CompetitionFees, EnrollLinkButton, EnventsTimeDropDown, ProfileLinkButton, RichTextDropDown, StatusBadge, SubThemeDropDown } from '../../components/competitions/CompetitionDetail'
import Spinner from '../../components/loadings/Spinner'
import { useGetCompetitionByIdQuery } from '../../features'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice'
import NotFound from '../NotFound'



const ErrorMessage = ({ error }) => {
    if (error.status === 404) {
        return (
            <NotFound />
        )
    }

    return (
        <div className="flex justify-center">
            <h1 className='text-2xl'>{JSON.stringify(error)}</h1>
        </div>
    )
}


const CompetitionDetailsMember = () => {
    const { id } = useParams()

    const profile = useSelector(selectCurrentProfile)

    const {
        data,
        isLoading,
        error,
    } = useGetParticipantByIdQuery({ competitionId: id, memberId: profile.id })

    if (isLoading) {
        return <Spinner message={'Sedang memuat kompetisi...'} />
    }

    if (error) {
        return <Spinner message={'Terjadi kesalahan silahkan muat ulang...'} />
    }

    const subThemeTag = {
        ISOTERM: 'Sub-tema',
        CRYSTAL: 'Materi'
    }

    const examTag = {
        ABSTRACT: 'Pengumpulan abstrak',
        PAPER: 'Pengumpulan karya ilmiah',
        CBT: 'Test Berbasis Komputer (CBT)'
    }

    return (
        <div>
            <div className="flex justify-between py-2">
                <div>
                    <h2 className='text-xl font-bold'>
                        {data.competition?.category}
                        <span className='text-xs font-semibold inline-block mx-2'>
                            {'( '}{examTag[data.competition?.exam_type]}{' )'}
                        </span>
                    </h2>

                    <p>{data.competition?.title}</p>

                </div>
                <div>
                    {data.isEnrolled ? <StatusBadge data={data.enroll} /> : null}
                    {data.isEnrolled ? <ProfileLinkButton messages={data.messages} /> : null}

                </div>
            </div>

            <RichTextDropDown texts={data.competition?.description} header={'Deskripsi'} />

            <SubThemeDropDown tag={subThemeTag[data.competition?.category]} subThemes={data?.competition?.competition_sub_themes} />

            <EnventsTimeDropDown competition={data?.competition} />

            <RichTextDropDown texts={data?.competition?.precations} header={'Syarat Pendaftaran'} />




            <div className="flex justify-end gap-2 py-2">
                {!data.isEnrolled ? <CompetitionFees paymentMethod={data?.competition?.payment_method} price={data.competition.entry_fee} /> : null}

            </div>
            <div className="flex justify-end gap-2 py-2">
                {!data.isEnrolled ? <EnrollLinkButton /> : null}

            </div>
        </div>

    )
}

export default CompetitionDetailsMember