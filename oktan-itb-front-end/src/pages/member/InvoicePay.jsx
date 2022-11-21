import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { FormButton } from '../../components/editor/FormActions'
import { InvoiceForm, InvoiceImage } from '../../components/invoices/InvoicesItem'
import Spinner from '../../components/loadings/Spinner'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useGetInvoiceByIdQuery, useSavePaymentsMutation, useSubmitPaymentsMutation, useUploadPaymentProofMutation } from '../../features/competitions/invoiceSlice'
import { toast } from 'react-toastify'
import { RichTextEditor } from '../../components/editor'

const InvoicePay = () => {

    const { id } = useParams()
    const profile = useSelector(selectCurrentProfile)

    const [state, setState] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    })

    const { data, isLoading, refetch, isFetching } = useGetInvoiceByIdQuery({ invoiceId: id })
    const [submitPay, {
        isSuccess: submitSuccess,
        isError: submitError,
        isLoading: submitLoading
    }] = useSubmitPaymentsMutation()

    const [savePayment, {
        isSuccess: saveSuccess,
        isError: saveError,
        isLoading: saveLoading
    }] = useSavePaymentsMutation()

    const [uploadPayment, {
        isSuccess: uploadSuccess,
        isError: uploadError,
        isLoading: uploadLoading
    }] = useUploadPaymentProofMutation()



    useEffect(() => {
        if (state.isSuccess) {
            toast.success(state.message)
            refetch()
        }

        if (state.isError) {
            toast.success(state.message)
            refetch()
        }

    }, [state])


    const handleSubmit = async (data) => {
        const formData = new FormData()
        formData.append('file', data.file[0])

        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        try {
            await savePayment({ memberId: data.memberId, competitionId: data.competitionId, body: data }).unwrap()
            await uploadPayment({ memberId: data.memberId, competitionId: data.competitionId, body: formData }).unwrap()
            await submitPay({ memberId: data.memberId, competitionId: data.competitionId }).unwrap()

            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
                message: 'Berhasil mengirimkan bukti pembayaran!'
            }))

        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: 'Terjadi kesalahan: ' + error.message
            }))
        }
    }

    if (isLoading || isFetching) {
        return <Spinner />
    }


    return (
        <div>
            <InvoiceForm invoiceData={data} readOnly={data.status === 'UNPAID' || data.status === 'REJECTED' ? false : true} onSubmit={handleSubmit}>
                <Link className={'btn btn-error text-white'} to={-1}>Cancel</Link>

                {data.status === 'UNPAID' || data.status === 'REJECTED' ?
                    <>
                        <FormButton className={'btn btn-info text-white'} type={'button'} isLoading={state.isLoading}>
                            Simpan
                        </FormButton>
                        <FormButton className={'btn btn-primary'} type={'submit'} isLoading={state.isLoading}>
                            Kirim
                        </FormButton>
                    </>
                    : null
                }

            </InvoiceForm>

            {data.status !== 'UNPAID' ?
                <div className='grid grid-cols-2 mt-10 gap-5'>

                    <div className="col-span-2 md:col-span-1 p-4">
                        <InvoiceImage className={'max-w-full h-auto'} file_url={data.file_url} />
                    </div>

                    <div className="col-span-2 md:col-span-1 p-4 ">
                        <h1 className='text-xl font bold'>Pesan dari panitia</h1>
                        <div className="mb-2">
                            {
                                data.messages.map(msg => {
                                    return <RichTextEditor
                                        key={msg.id}
                                        value={msg.message}
                                        readOnly={true} />
                                })
                            }

                        </div>



                        <div className="grid grid-cols-4">
                            <div className="col-span-1">
                                Nama File
                            </div>
                            <div className="col-span-3 text-xs font-thin italic">
                                {data.proof_file}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 mt-4">
                            <div className="col-span-4">
                                <a href={data.file_url} target={'_blank'} className='btn btn-block btn-info'>Download</a>
                            </div>
                        </div>
                    </div>

                </div>
                : null}

        </div>
    )
}

export default InvoicePay