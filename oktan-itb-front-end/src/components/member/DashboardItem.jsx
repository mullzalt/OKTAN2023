import React from 'react'
import { useSelector } from 'react-redux'
import WelcomeImg from '../../assets/img/welcome.jpg';
import { Link } from 'react-router-dom'
import CompetitionCardItems from '../competitions/CompetitionCard';
import { useGetCompetitionsQuery } from '../../features/competitions/competitionSlice';
import NotificationWrapper from '../notifications/NotificationWrapper';
import { BiBadge, BiBadgeCheck, BiMoney, BiNotification, BiBell } from 'react-icons/bi';
import Notification, { NotificationCard } from '../notifications/Notification';
import { useGetMyInvoicesQuery } from '../../features/competitions/invoiceSlice';


const EnrollmentCard = ({ count, title, link, icon, children }) => {

    return (
        <div className="card col-span-12 md:col-span-6 lg:col-span-4  border border-gray-600">
            <div className="card-body">
                <h2 className="card-title">{title} </h2>
                <span className='flex justify-between p-4 text-2xl font-bold'>
                    <span className='inline-block mr-2 text-8xl'>{icon} </span>
                    <span className='inline-block mt-4 text-6xl'>{count} </span>

                </span>


                <div className="card-actions justify-end">
                    <Link to={link} className="btn btn-outline btn-info">Lihat lebih lanjut</Link>
                    {children}
                </div>
            </div>
        </div>
    )
}


export const DashboardItemMember = ({ profile }) => {

    const notEnrolled = { where: '', drafted: false, enrolled: false }
    const { data: isoterms, error: isoError, isLoading: isoLoading } = useGetCompetitionsQuery({ ...notEnrolled })

    const enrolled = { where: '', drafted: false, enrolled: true }
    const { data: enrolledComp, error: ecError, isLoading: isEcLoading } = useGetCompetitionsQuery({ ...enrolled })

    const { data: invoiceData,
        isLoading: invoiceLoading,
        isError: invoiceError
    } = useGetMyInvoicesQuery({ memberId: profile.id })



    return (
        <React.Fragment>
            <div className='bg-primary p-5 text-gray-100 mb-5'>
                <span className='text-lg font-bold'>Hallo</span>, selamat datang kembali {profile.name}!!
            </div>

            <div className='grid grid-cols-12 gap-4'>
                {
                    isoLoading ? <>...</> : isoError ? <>Something went wrong</> :
                        isoterms ?
                            <EnrollmentCard
                                title={'Lomba yang belum diikuti:'}
                                count={isoterms.length}
                                link={'/competitions'}
                                icon={<BiBadge />}
                            />

                            : null
                }

                {
                    isEcLoading ? <>...</> : ecError ? <>Something went wrong</> :
                        enrolledComp ?
                            <EnrollmentCard
                                title={'Lomba yang kamu ikuti:'}
                                count={enrolledComp.length}
                                link={'/competitions'}
                                icon={<BiBadgeCheck />}
                            />

                            : null
                }

                {
                    invoiceLoading ? <>...</> : invoiceError ? <>Something went wrong</> :
                        invoiceData ?
                            <EnrollmentCard
                                title={'Tagihan Pembayaran:'}
                                count={invoiceData.length}
                                link={'/invoices'}
                                icon={<BiMoney />}
                            />

                            : null
                }

            </div>


        </React.Fragment>
    )
}


export default DashboardItemMember