import html2canvas from 'html2canvas';
import React from 'react'
import { useRef } from 'react';
import { useGetInvoiceByIdQuery } from '../../features/competitions/invoiceSlice'
import Pulse from '../loadings/Pulse'
import Logo from '../../assets/img/logo.png'
import { useForm } from 'react-hook-form';
import { BankOptionsForm } from '../bankAccounts/bankAccountItem';

const formatDate = (date) => {
    var myDate = new Date(date);
    const format = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }

    const formatedDate = myDate.toLocaleDateString('id-ID', format)

    return formatedDate
}

const currencyFormat = (nominal) => {
    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return currencyFormatter.format(nominal)
}

export const InvoiceImage = ({ file_url, className }) => {
    return (
        <img className={className} src={file_url} alt={'Bukti transfer pembayaran'}>

        </img>
    )
}

export const InvoiceStatusBadge = ({ status }) => {
    const display = {
        UNPAID: 'BELUM BAYAR',
        PENDING: 'Menunggu acc..',
        PAIDOFF: 'LUNAS',
        REJECTED: 'DITOLAK'
    }

    const className = {
        UNPAID: 'badge badge-outline  p-4 badge-secondary',
        PENDING: 'badge badge-outline  p-4 badge-warning',
        PAIDOFF: 'badge  badge-outline p-4 badge-success',
        REJECTED: 'badge  badge-outline p-4 badge-error'
    }


    return (
        <div className={className[status]}>{display[status]}</div>
    )
}


export const InvoiceCard = ({ id, children, header }) => {
    const { data, isLoading, refetch } = useGetInvoiceByIdQuery({ invoiceId: id })


    if (isLoading) {
        return <Pulse />
    }

    return (
        <div className='card shadow-lg'>
            <div className='card-title  p-4 rounded  flex justify-between '>
                <span className=''>{data.competition.category} - {data.competition.title}</span>
                {header}
            </div>

            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Kepada</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">Nama </span>
                    <span className=" col-span-6 md:col-span-3">{data.member.name}</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">No Telp</span>
                    <span className=" col-span-6 md:col-span-3">{data.member.phone}</span>
                </div>

            </div>
            <div className="card-body py-4 divide-y">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Waktu</span>
                </div>
                <div className="grid grid-cols-12 font-semibold ">
                    <span className=" col-span-6 md:col-span-3">Dikirimkan pada: </span>
                    <span className=" col-span-6 md:col-span-3">{formatDate(data.createdAt)}</span>
                </div>
                <div className="grid grid-cols-12 font-semibold ">
                    <span className=" col-span-6 md:col-span-3">Batas Pembayaran: </span>
                    <span className=" col-span-6 md:col-span-3">{formatDate(data.competition.register_due)}</span>
                </div>


            </div>
            <div className="card-actions justify-end p-4 text-xl font-semibold text-orange-600">
                <span>Total: </span>
                <span>{currencyFormat(data.total_ammount)}</span>

            </div>

            <div className="card-actions justify-end p-4">
                {children}
            </div>

        </div >
    )
}


export const InvoiceForm = ({ invoiceData, onSubmit, readOnly, children }) => {
    const invoice = invoiceData

    const { register, handleSubmit, getValues, setValue, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            bank_customer: invoice.bank_customer || '',
            bank_number: invoice.bank_number || '',
            payment_to: invoice.paymentToId || '',
            file: {},
            competitionId: invoice.competitionId,
            memberId: invoice.memberId
        },
        mode: 'onChange'
    })



    return (
        <div className="card bg-base-100 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                        <label className="label col-span-1">
                            <span className="label-text">Kepada</span>
                        </label>
                        <input type="text"
                            id='teamName'
                            name='teamName'
                            placeholder={invoice.member.name}
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
                            placeholder={`${invoice.competition.category} - ${invoice.competition.title}`}
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
                            placeholder={currencyFormat(invoice.total_ammount)}
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
                            {...register('bank_customer', {
                                required: 'Harap isi kolom ini!',
                                disabled: readOnly
                            })}
                            placeholder="Nama Rekening"
                            className={`input input-bordered col-span-5 ${errors.bank_customer && 'input-error'}`}
                        />
                        {errors.bank_customer &&
                            <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                {errors.bank_customer.message}
                            </span>
                        }
                    </div>

                    <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                        <label className="label col-span-1">
                            <span className="label-text">Nomor Rekening</span>
                        </label>
                        <input type="text" {...register('bank_number', {
                            required: 'Harap isi kolom ini!',
                            disabled: readOnly
                        })}
                            pattern="[0-9]*"
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Nomor Rekening"
                            className={`input input-bordered col-span-5 ${errors.bank_number && 'input-error'}`}
                        />
                        {errors.bank_number &&
                            <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                {errors.bank_number.message}
                            </span>
                        }
                    </div>

                    <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                        <label className="label col-span-1">
                            <span className="label-text">Pembayaran Ke</span>
                        </label>
                        <div className="col-span-5">
                            <select
                                {...register('payment_to', {
                                    required: 'Harap pilih rekening tujuan!',
                                    disabled: readOnly
                                })}
                                className={`select select-bordered overflow-x-hidden ${errors.payment_to && 'select-error'}`}
                            >
                                <option value={''} disabled selected>Pilih Rekening Tujuan</option>
                                <BankOptionsForm />
                            </select>
                        </div>
                        {errors.payment_to &&
                            <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                {errors.payment_to.message}
                            </span>
                        }

                    </div>




                    {!readOnly &&
                        <>
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
                                    <input {...register('file', {
                                        required: 'Harap mengunggah screenshot bukti pembayaran!',
                                        validate: {
                                            lessThan2Mb: (f) => f[0]?.size < (1 * 1024 * 1024) || 'Harus kurang dari 1 mb!',
                                            acceptedFormats: (f) => ['image/jpeg', 'image/png', 'image/jpg'].includes(f[0]?.type) || 'Hanya menerima file dalam bentuk jpg/jpeg/png!'
                                        }
                                    })}
                                        type="file" placeholder="Upload file..."
                                        className={`block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full ${errors.file
                                                ? 'file:border-1 file:border-error'
                                                : 'file:border-0'}
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100   `}
                                        accept="image/*"
                                    />
                                </div>
                                {errors.file &&
                                    <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                        {errors.file.message}
                                    </span>
                                }
                            </div>
                        </>
                    }


                    <div className="flex justify-end gap-5">
                        {children}
                    </div>

                </div>
            </form>
        </div>
    )


}



const InvoicesItem = ({ invoice, children }) => {
    const downloadRef = useRef()

    const invoiceId = invoice ? 'OKN' + (invoice.id).slice(0, 4).toUpperCase() + '/' + (invoice.competition.category).slice(0, 3) + '/' + (invoice.member.id).slice(0, 4).toUpperCase() : null

    const handleDownloadImage = async () => {
        const element = downloadRef.current;
        const clone = element.cloneNode()
        const canvas = await html2canvas(element, { windowWidth: 1366, windowHeight: 1440 })

        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'BUKTI_PEMBAYARAN_OKTAN_ITB.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    return (
        <div className='pt-5 min-w-max'>
            <div className="card bg-base-100 shadow-xl ">
                <div className="card-body" ref={downloadRef}>
                    <div className="flex justify-between">
                        <div>
                            <h1 className='text-xl font-semibold'>TEAM OKTAN ITB</h1>
                            <div className="text-gray-500 font-semibold mt-2">OKTAN ITB 2023</div>
                            <div className="text-gray-500 font-semibold mt-2">Jl. Ganesa No.10, Lb. Siliwangi, <br />Kecamatan Coblong, Kota Bandung, <br />Jawa Barat 40132</div>
                        </div>
                        <img src={Logo} alt="" className='w-40' />
                    </div>

                    <div className="flex justify-between mt-10">
                        <div>
                            <h1 className='font-semibold'>Tagihan Kepada</h1>
                            <div className="text-gray-500 font-semibold mt-2">{invoice.member.name}</div>
                            <div className="text-gray-500 font-semibold mt-2">{invoice.member.institute}</div>
                            <div className="text-gray-500 font-semibold mt-2">{invoice.member.phone}</div>
                        </div>

                        <div>
                            <div className='grid grid-cols-2'>
                                <h1 className='font-semibold'>No. Invoice</h1>
                                <h1 className='font-semibold'>{invoiceId}</h1>
                            </div>
                            <div className='grid grid-cols-2'>
                                <h1 className='font-semibold'>Tanggal Tagihan </h1>
                                <h1 className='font-semibold'>{formatDate(invoice.createdAt)}</h1>
                            </div>
                            <div className='grid grid-cols-2'>
                                <h1 className='font-semibold'>Berlaku sampai</h1>
                                <h1 className='font-semibold'>{formatDate(invoice.competition.register_due)}</h1>
                            </div>

                        </div>

                    </div>

                    {
                        invoice.status !== 'UNPAID' &&
                        <div className="flex justify-between gap-10 mt-10">

                            <div>
                                <h1 className='font-semibold'>Pembayaran Kepada</h1>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.bank_member_name}</div>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.bank_name}</div>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.card_number}</div>
                                </div>

                            </div>

                            <div>
                                <h1 className='font-semibold'>Melalui</h1>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2">{invoice?.bank_customer}</div>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2"></div>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <div className="text-gray-500 font-semibold mt-2">{invoice?.bank_number}</div>
                                </div>

                            </div>

                            <div>
                                <div className='grid grid-cols-2'>
                                    <h1 className='font-semibold'>Tanggal Pembayaran</h1>
                                    <h1 className='font-semibold'>{formatDate(invoice.updatedAt)}</h1>
                                </div>

                            </div>
                        </div>
                    }


                    <div className='mt-10'>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Nama Kompetisi</th>
                                        <th>Jenis Kompetisi</th>
                                        <th>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{invoice.competition.title}</td>
                                        <td>{invoice.competition.category}</td>
                                        <td>{currencyFormat(invoice.competition.entry_fee)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-end font-semibold text-xl'>Total : </td>
                                        <td>
                                            <h2 className='text-xl font-semibold'>{currencyFormat(invoice.total_ammount)}</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-end font-semibold'>Status : </td>
                                        <td>
                                            <h2 className='font-semibold'>
                                                <InvoiceStatusBadge status={invoice.status} />
                                            </h2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='text-xs mt-8 mb-3'>Notes : <br />
                        Terimakasih telah ikut berpartisipasi dalam kegiatan kompetisi ini.<br />
                        Tagihan ini merupakan bukti digital yang dibuat secara otomatis <br />
                        yang ditujukan kepada peserta yang telah mendaftar dalam kompetisi OKTAN ITB 2023
                    </div>

                    <hr />




                </div>


                <div className="card-body pt-0">

                    <div className="flex justify-end gap-4">
                        {children}
                        {<button className='btn btn-primary' onClick={handleDownloadImage}>Download Invoice</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicesItem