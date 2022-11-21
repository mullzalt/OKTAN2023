import React from 'react'
import CompetitionCardItems from '../../components/competitions/CompetitionCard'
import { ModeratorCompetitionItem } from '../../components/moderator'
import { useGetCompetitionByIdQuery, useGetCompetitionsQuery } from '../../features'




const CompetitionListsMember = () => {
    const notEnrolled = { where: '', drafted: false, enrolled: false }
    const { data: notEnroll, error: notEnrollError, isLoading: notEnrollLoading } = useGetCompetitionsQuery({ ...notEnrolled })

    const enrolled = { where: '', drafted: false, enrolled: true }
    const { data: enroll, error: enrollError, isLoading: enrollLoading } = useGetCompetitionsQuery({ ...enrolled })

    return (
        <div>

            <h1 className='font-bold text-2xl my-2'>Lomba yang belum diikuti</h1>
            <div className='flex'>
                {
                    notEnrollLoading ? <>...</> : notEnrollError ? <>Something went wrong</> :
                        notEnroll.length > 0 ? notEnroll.map(comp => {
                            return <CompetitionCardItems id={comp.id} />
                        }) : <span className='font-thin text-xl ml-5'>Sudah mengikuti semua lomba yang tersedia saat ini...</span>
                }

            </div>

            <h1 className='font-bold text-2xl my-2'>Lomba yang diikuti</h1>
            <div className='flex'>
                {
                    enrollLoading ? <>...</> : enrollError ? <>Something went wrong</> :
                        enroll.length > 0 ? enroll.map(comp => {
                            return <CompetitionCardItems id={comp.id} />
                        }) : <span className='font-thin text-xl ml-5'>Sudah mengikuti semua lomba yang tersedia saat ini...</span>
                }

            </div>


        </div>
    )
}

export default CompetitionListsMember