import React, { Component } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


const rowHandler = ({ rows }) => {

}


const TableRow = ({ data }) => {

    return (
        <tr>
            {data.map((row, index) => {
                return (
                    <td key={`${row}${index}`}>{row}</td>
                )
            })}
        </tr>
    )
}

const TableHead = ({ header }) => {

    return (
        <th>
            {header}
        </th>
    )
}

const EmptyMessage = () => {
    return (
        <div className='w-full flex justify-center bg-base-200 p-20'>
            <h1 className='text-2xl'>Tidak ada data untuk ditampilkan...</h1>
        </div>
    )
}

const SearchBar = props => {
    const { onChange, value, placeholder } = props

    return (
        <div className="form-control mb-4">

            <input
                type="text"
                placeholder={placeholder || 'Search...'}
                value={value}
                onChange={onChange}
                className="input input-bordered w-full" />

        </div>
    )

}

const FilterRadio = props => {
    const { onChange, selected, options, name } = props

    return (
        <div className="btn-group my-5 gap-2">
            {
                options.map((option) => {
                    return <input type="radio"
                        name={name}
                        data-title={option.title}
                        className={`btn btn-outline btn-${option.type}`}
                        value={option.value}
                        checked={selected === option.value ? true : false}
                        onChange={onChange} />
                })
            }
        </div>
    )

}

const ItemCounters = props => {
    const { totalItem, pageSize, currentPage } = props

    const firstIndex = (pageSize * (currentPage - 1)) + 1
    const checklastIndex = pageSize * currentPage
    const total = totalItem
    const lastIndex = checklastIndex > total ? totalItem : checklastIndex
    return (
        <div className={props.className}>
            <span className="text-sm text-gray-700">
                Menampilkan
                <span className="font-semibold text-gray-900 mx-2">{firstIndex}</span>
                sampai
                <span className="font-semibold text-gray-900 mx-2">{lastIndex}</span>
                dari
                <span class="font-semibold text-gray-900 mx-2">{total}</span> Entries
            </span>
        </div>
    )
}

const TableContainer = ({ className, headers, rows }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    {
                        headers.map(header => {
                            return <TableHead key={header} header={header} />
                        })
                    }
                </thead>
                <tbody>
                    {rows.map((row) => {
                        return <TableRow key={row.id} data={row.items} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export { EmptyMessage, SearchBar, ItemCounters, FilterRadio }

export default TableContainer