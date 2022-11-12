import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdatePaymentProofMutation, useUploadPaymentProofMutation } from '../../services/invoiceService';
import Spinner from '../Spinner';



const formatDate = (date) => {
    var myDate = new Date(date);
    return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
}

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const bankAccounts = (value, index) => {

    let values = `${value.bank_name} - ${value.card_number} - ${value.bank_member_name}`
    return (<option key={index} value={value.id}>{values}</option>)

}

const InvoiceForm = ({ invoice, banks }) => {

    const navigate = useNavigate()

    const [formPayment, setFormPayment] = useState({
        bankCustomer: '',
        bankNumber: '',
        paymentTo: '',
        file: ''
    })

    const [state, setState] = useState({
        error: false,
        loading: false,
        message: ''
    })

    const [submitPayment, { data: paymentSend, error: paymentError, isError: isPaymentError, isLoading: isPaymentLoading }] = useUploadPaymentProofMutation()
    const [savePayment, { data: updatePayement, isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdatePaymentProofMutation()


    const onSelectChange = (e) => {
        e.preventDefault()
        setFormPayment((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const paymentFormData = new FormData()
        paymentFormData.append('file', formPayment.file)
        paymentFormData.append('bankCustomer', formPayment.bankCustomer)
        paymentFormData.append('bankNumber', formPayment.bankNumber)
        paymentFormData.append('paymentTo', formPayment.paymentTo)

        try {
            await savePayment({ id: invoice.competition.id, body: formPayment })
            await submitPayment({ id: invoice.competition.id, body: paymentFormData })
            setState((prevState) => ({ ...prevState, error: false, loading: false, success: true }));
        } catch (error) {
            console.log(error)
        }
    }


    const onSave = async (e) => {
        e.preventDefault()
        const paymentFormData = new FormData()
        paymentFormData.append('file', formPayment.file)
        paymentFormData.append('bankCustomer', formPayment.bankCustomer)
        paymentFormData.append('bankNumber', formPayment.bankNumber)
        paymentFormData.append('paymentTo', formPayment.paymentTo)

        try {
            await savePayment({ id: invoice.competition.id, body: formPayment })
        } catch (error) {
            console.log(error)
        }
    }

    const onFileChange = (e) => {
        let size_limit = 2 * 1024 * 1024
        let filename = e.target.files[0].name
        let filesize = e.target.files[0].size
        let filetype = e.target.files[0].type

        let isLarger = filesize > size_limit ? true : false
        let ext = filename.match(/\.([^\.]+)$/)[1]

        if (isLarger) {
            setState((prevState) => ({ ...prevState, error: true, loading: false, message: 'File can not exceed 4MB!' }));
            return
        }

        setFormPayment((prevState) => ({
            ...prevState,
            file: e.target.files[0],
        }))

    }

    useEffect(() => {
        if (isPaymentError) console.log(paymentError)

        if (state.success) {
            navigate(`/payments/me`, {
                state: {
                    notification: {
                        type: 'success',
                        message: 'Berhasil mengirimkann data pembayaran'
                    }
                }
            })
        }

        if (isPaymentError || isUpdateError) {
            navigate(`/payments/me`, {
                state: {
                    notification: {
                        type: 'error',
                        message: "Terjadi kesalahan, silahkan ulang kembali"
                    }
                }
            })
        }

    }, [isPaymentError, paymentError, state.error, state.success, isUpdateError])

    if (isPaymentLoading || isUpdateLoading) {
        return <Spinner />
    }





    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Bayar</h1>
            <h1 className='text-lg font-semibold text-center lg:text-left'>Kategori - Judul</h1>
            <div className='pt-5 w-full'>
                <div className="card bg-base-100 shadow-xl">
                    <form onSubmit={onSubmit}>
                        <div className="card-body">
                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Kepada</span>
                                </label>
                                <input type="text"
                                    id='teamName'
                                    name='teamName'
                                    // value={inputFieldStatic.teamName}
                                    // onChange={onChangeStatic}
                                    placeholder={invoice.member.name}
                                    required={true}
                                    className={`input col-span-5 input-ghost`}
                                    readOnly
                                />
                            </div>
                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Kompetisi</span>
                                </label>
                                <input type="text"
                                    id='teamName'
                                    name='teamName'
                                    // value={inputFieldStatic.teamName}
                                    // onChange={onChangeStatic}
                                    placeholder={`${invoice.competition.category} - ${invoice.competition.title}`}
                                    required={true}
                                    className={`input col-span-5 input-ghost`}
                                    readOnly
                                />
                            </div>

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Tagihan</span>
                                </label>
                                <input type="text"
                                    id='teamName'
                                    name='teamName'
                                    // value={inputFieldStatic.teamName}
                                    // onChange={onChangeStatic}
                                    placeholder={currencyFormatter.format(invoice.total_ammount)}
                                    required={true}
                                    className={`input col-span-5 input-ghost`}
                                    readOnly
                                />
                            </div>

                            <label className='font-semibold text-primary text-sm mt-5'>Masukkan Informasi Transfer</label>
                            <hr />

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Nama Rekening</span>
                                </label>
                                <input type="text"
                                    id='bankCustomer'
                                    name='bankCustomer'
                                    defaultValue={'asdfasdf'}
                                    value={formPayment.bankCustomer}
                                    onChange={onSelectChange}
                                    placeholder="Nama Rekening"
                                    required={true}
                                    className={`input input-bordered col-span-5`}
                                />
                            </div>

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Nomor Rekening</span>
                                </label>
                                <input type="text"
                                    id='bankNumber'
                                    name='bankNumber'
                                    pattern="[0-9]*"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    value={formPayment.bankNumber}
                                    onChange={onSelectChange}
                                    placeholder="Nama Rekening"
                                    required={true}
                                    className={`input input-bordered col-span-5`}
                                />
                            </div>

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Pembayaran Ke</span>
                                </label>
                                <div className="col-span-5">
                                    <select className="select select-bordered" name="paymentTo" onChange={onSelectChange} required>
                                        <option disabled selected>Pilih Rekening Tujuan</option>
                                        {banks.map((v, i) => {
                                            return bankAccounts(v, i)
                                        })}
                                    </select>
                                </div>
                            </div>


                            <div className="alert shadow-lg my-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>File yang diupload berupa screenshot bukti transfer.</span>
                                </div>
                            </div>


                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label">
                                    <span className="label-text">Upload Screenshot</span>
                                </label>
                                <div className="col-span-5">
                                    <input type="file" placeholder="Upload file..." className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                                        required={true}
                                        accept="image/*"
                                        onChange={onFileChange} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-5">
                                {/* <button type='button' onClick={onSave} className='btn btn-primary text-white'>Simpan Draft</button> */}
                                <button type='submit' className='btn btn-success text-white'>Kirim</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InvoiceForm;