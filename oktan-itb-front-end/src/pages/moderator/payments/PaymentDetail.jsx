import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RichTextEditor } from '../../../components/editor'
import InvoicesItem, { InvoiceForm, InvoiceImage, InvoiceStatusBadge } from '../../../components/invoices/InvoicesItem'
import Spinner from '../../../components/loadings/Spinner'
import { useGetInvoiceByIdQuery, useVerifyPaymentsMutation } from '../../../features/competitions/invoiceSlice'




export const ActionsForm = ({ onClick, selected, message }) => {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            messages: message || '',
            actions: selected || '',
        },
        mode: 'onChange'
    })

    const onClickHandle = (data) => {
        onClick(data)
    }

    return (
        <div className="form-control ">
            <form onSubmit={handleSubmit(onClickHandle)}>

                <div className='mb-5'>
                    <RichTextEditor
                        placeholder={'tulis pesan...'}
                        onChange={dat => { setValue('messages', dat) }}
                        value={getValues('messages')}
                    />

                </div>


                <div className="btn-group flex justify-center gap-2" key={'status'}>
                    <input {...register('actions')}
                        type="radio"
                        data-title="APPROVE"
                        value='APPROVE'
                        className="btn btn-lg btn-outline btn-success col-span-1" />

                    <input {...register('actions')}
                        type="radio"
                        data-title="TOLAK"
                        value='REJECT'
                        className="btn btn-lg btn-outline btn-error col-span-1" />
                </div>

                <div className="form-control py-2 mt-6">
                    <div className="grid grid-cols-4 gap-4">
                        <input type="submit"
                            class="btn btn-primary px-10 col-span-4"
                            value={'Kirim'} />
                    </div>
                </div>
                {errors.action && <span>error</span>}
            </form>

        </div>
    )
}



const PaymentDetail = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { data, isLoading, refetch, isFetching } = useGetInvoiceByIdQuery({ invoiceId: id })


    const [verify, { isLoading: verifyLoading, isSuccess: verifySuccess, error: verifyError, isError }] = useVerifyPaymentsMutation()


    useEffect(() => {
        if (isError) {
            toast.error('Gagal memverivikasi pembayaran: ' + verifyError.data.message)
            refetch()
        }

        if (verifySuccess) {
            toast.success('Berhasil memverivikasi status pembayaran ')
            refetch()
            navigate(-1)

        }
    }, [verifyError, verifySuccess, isError, navigate])


    if (isLoading || isFetching || verifyLoading) {
        return <Spinner />
    }

    const onClickHandle = async (data) => {
        try {
            await verify({ invoiceId: id, body: data }).unwrap()
        } catch (error) {

        }
    }

    return (
        <div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1 p-2">
                    <h1 className='text-lg font-bold mb-4'>Formuli Pembayaran</h1>
                    <InvoiceForm invoiceData={data} readOnly={true} >
                        <InvoiceStatusBadge status={data.status} />
                    </InvoiceForm>
                </div>
                <div className="col-span-2 md:col-span-1 p-2">
                    <h1 className='text-lg font-bold mb-4'>Bukti Pembayaran</h1>
                    <InvoiceImage className={'max-w-full h-auto'} file_url={data.file_url} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <h1 className='text-lg font-bold mb-4'>Validasi Pembayaran</h1>
                    <ActionsForm onClick={onClickHandle} />
                </div>
                <div className="col-span-2">
                    <h1 className='text-lg font-bold mb-4'>Invoice Peserta</h1>
                    <InvoicesItem invoice={data}>
                        <button
                            className='btn btn-warning'
                            onClick={() => navigate(-1)}
                        >
                            Kembali
                        </button>
                    </InvoicesItem>
                </div>

            </div>

        </div>
    )
}

export default PaymentDetail