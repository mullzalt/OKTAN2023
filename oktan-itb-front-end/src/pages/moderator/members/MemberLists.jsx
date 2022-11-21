import React from 'react'
import { useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import Pagination from '../../../components/Pagination'

import TableContainer, { EmptyMessage, FilterRadio, ItemCounters, SearchBar } from '../../../components/tables/TableContainer'
import { useGetMembersQuery } from '../../../features/users/memberSlice'



const RegistrationBadge = ({ verified }) => {
    const label = verified ? <BiCheck /> : <BiError />

    const className = verified ? 'badge badge-success text-xl text-white font-bold' : 'badge badge-warning text-xl font-bold'

    return (
        <div className={className}>{label}</div>
    )
}


const MemberLists = () => {
    const [queryParams, setQueryParams] = useState({
        where: '',
        page: 1,
        size: 10
    })

    const {
        data,
        isLoading,
        isError } = useGetMembersQuery({ ...queryParams })




    return (
        <div>

            <SearchBar
                value={queryParams.where}
                onChange={search => {
                    search.preventDefault()
                    setQueryParams((prev) => ({
                        ...prev,
                        where: search.target.value,
                        page: 1
                    })
                    )
                }} />

            {
                isLoading
                    ? <Spinner message={'Mengambil data peserta'} />
                    : isError
                        ? <>Something went wrong</>
                        : data.rows.length === 0 ? <EmptyMessage />
                            :
                            <div className='mt-9'>
                                <TableContainer
                                    headers={['Username', 'Email', 'Nama', 'No Hp', 'Asal Instansi', 'Teregistrasi', 'helper']}
                                    rows={data.rows.map((mem, index) => {
                                        return {
                                            id: mem.id,
                                            items: [
                                                mem.user.username,
                                                mem.user.email,
                                                mem.name,
                                                mem.phone,
                                                mem.institute,
                                                <RegistrationBadge verified={mem.user.verified} />,
                                                <Link className='link link-info' to={mem.id}>Detail</Link>
                                            ]
                                        }
                                    })} />
                                <ItemCounters className='flex justify-center mt-2'
                                    totalItem={data.totalItem}
                                    pageSize={data.size}
                                    currentPage={data.currentPage}
                                />
                                <div className='flex justify-center'>

                                    <Pagination
                                        onPageChange={page =>
                                            setQueryParams((previusValue) =>
                                                ({ ...previusValue, page: page })
                                            )}
                                        totalCount={data.totalItem}
                                        currentPage={data.currentPage}
                                        pageSize={data.size}
                                    />

                                </div>
                            </div>
            }


        </div>
    )
}

export default MemberLists