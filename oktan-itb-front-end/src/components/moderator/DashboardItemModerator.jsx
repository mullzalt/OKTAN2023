import React from 'react'
import { FaMoneyCheck, FaPaperclip, FaUsers } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useGetInvoicesLogQuery } from '../../features/competitions/invoiceSlice'
import { useGetPapersQuery } from '../../features/competitions/submissionSlice'
import { useGetMembersQuery } from '../../features/users/memberSlice'




const CardDahsboard = ({ count, title, link, icon, children }) => {



    return (
        <div className="card col-span-12 md:col-span-6 lg:col-span-4  border border-gray-600">
            <div className="card-body">
                <h2 className="card-title">{title} </h2>
                <span className='flex justify-between p-4 text-2xl font-bold'>
                    <span className='inline-block mr-2 text-8xl'>{icon} </span>
                    <span className='inline-block mt-4 text-6xl'>{count} </span>

                </span>


                <div className="card-actions justify-end">
                    {children}
                    <div className="card-actions justify-end">
                        <Link to={link} className="btn btn-outline btn-info">Lihat lebih lanjut</Link>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const DashboardItemModerator = ({ profile }) => {

    const { data: member, isLoading: memberLoading, isError: memberError } = useGetMembersQuery({ size: 1 })
    const { data: paper, isLoading: paperLoading, isError: paperError } = useGetPapersQuery({ size: 1 })
    const { data: payment, isLoading: paymentLoading, isError: paymentError } = useGetInvoicesLogQuery({ size: 1 })

    return (
        <React.Fragment>
            <div className='bg-primary p-5 text-gray-100 mb-5'>
                <span className='text-lg font-bold'>Hallo</span>, selamat datang kembali {profile.name}!!
            </div>


            <div className='grid grid-cols-12 gap-4'>
                {
                    memberLoading ? <>...</> : memberError ? <>Something went wrong</> :
                        member ?
                            <CardDahsboard
                                title={'Total pendaftar:'}
                                count={member.totalItem}
                                link={'/moderator/members'}
                                icon={<FaUsers />}
                            />

                            : null
                }
                {
                    paperLoading ? <>...</> : paperError ? <>Something went wrong</> :
                        paper ?
                            <CardDahsboard
                                title={'Total Submisi Karya Tulis:'}
                                count={paper.totalItem}
                                link={'/moderator/papers'}
                                icon={<FaPaperclip />}
                            />

                            : null
                }
                {
                    paymentLoading ? <>...</> : paymentError ? <>Something went wrong</> :
                        payment ?
                            <CardDahsboard
                                title={'Total Transaksi:'}
                                count={payment.totalItem}
                                link={'/moderator/payments'}
                                icon={<FaMoneyCheck />}
                            />

                            : null
                }

            </div>
        </React.Fragment>
    )
}

export default DashboardItemModerator