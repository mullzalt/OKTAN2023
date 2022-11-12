import html2canvas from 'html2canvas';
import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';




const PaymentDetailItem = ({ invoice }) => {
    const downloadRef = useRef()

    const invoiceId = invoice ? 'OKN' + (invoice.id).slice(0, 4).toUpperCase() + '/' + (invoice.competition.category).slice(0, 3) + '/' + (invoice.member.id).slice(0, 4).toUpperCase() : null

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

    const statusBadge = (status) => {
        if (status === 'PENDING') return (<div className='badge p-4 badge-warning '>Sedang diprosess...</div>)
        if (status === 'PAIDOFF') return (<div className='badge p-4 badge-success text-white '>LUNAS</div>)
        if (status === 'REJECTED') return (<div className='badge p-4 badge-error text-white'>DITOLAK</div>)

        return (<div className='badge p-4'>Terjadi kesalahan...</div>)
    }

    const handleDownloadImage = async () => {
        const element = downloadRef.current;
        const clone = element.cloneNode()
        const canvas = await html2canvas(element, { windowWidth: 1366, windowHeight: 1440 });

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
        <div className='pt-5 w-full'>
            <div className="card bg-base-100 shadow-xl">
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
                            <h1 className='font-semibold'>No. Invoice: {invoiceId}</h1>
                            <h1 className='font-semibold mt-2'>Tanggal Tagihan : {formatDate(invoice.createdAt)}</h1>
                            <h1 className='font-semibold mt-2'>Berlaku sampai : {formatDate(invoice.competition.register_due)}</h1>
                        </div>
                    </div>

                    <div className="flex justify-between mt-10">
                        <div>
                            <h1 className='font-semibold'>Pembayaran Kepada</h1>
                            <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.bank_member_name ? invoice?.paymentTo?.bank_member_name : null}</div>
                            <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.bank_name ? invoice?.paymentTo?.bank_name : null}</div>
                            <div className="text-gray-500 font-semibold mt-2">{invoice?.paymentTo?.card_number ? invoice?.paymentTo?.card_number : null}</div>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Tanggal Pembayaran : {formatDate(invoice.updatedAt)}</h1>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Nama Kompetisi</th>
                                        <th>Jenis Perlombaan</th>
                                        <th>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{invoice.competition.category}</td>
                                        <td>{invoice.competition.title}</td>
                                        <td>{currencyFormatter.format(invoice.competition.entry_fee)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-end font-semibold text-xl'>Total : </td>
                                        <td>
                                            <h2 className='text-xl font-semibold'>{currencyFormatter.format(invoice.total_ammount)}</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-end font-semibold'>Status : </td>
                                        <td>
                                            <h2 className='font-semibold'>
                                                {statusBadge(invoice.status)}
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

                    <hr className='' />




                </div>
                <div className="card-body pt-0">
                    {invoice?.message ? (
                        <div className="flex flex-col mb-10">
                            <div>Pesan dari Panitia</div>
                            <textarea className="textarea textarea-bordered" value={invoice?.message} readOnly></textarea>
                        </div>
                    ) : null}

                    <div className="flex justify-end">
                        {invoice.status === 'PAIDOFF' ? <button className='btn btn-primary justify-end' onClick={handleDownloadImage}>Download Bukti Pembayaran</button> : <button className='btn btn-primary justify-end' disabled>Download Bukti Pembayaran</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailItem;