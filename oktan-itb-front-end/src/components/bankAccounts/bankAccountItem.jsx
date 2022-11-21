import React from 'react'
import { useGetBanksQuery } from '../../features/competitions/bankAccountSlice'



export const BankOptionsForm = () => {
    const { data, isLoading } = useGetBanksQuery({ params: { size: 100, page: 1 } })

    if (isLoading) {
        return (
            <option>loading...</option>
        )
    }

    return (
        <>
            {data.rows.map(acc => {
                return (
                    <option value={acc.id}>{acc.bank_name} - {acc.card_number} - {acc.bank_member_name}</option>
                )
            })}
        </>
    )

}


const bankAccountItem = () => {
    return (
        <div>bankAccountItem</div>
    )
}

export default bankAccountItem