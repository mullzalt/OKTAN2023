import html2canvas from 'html2canvas';
import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';


const InvoiceDetailItem = ({ invoice }) => {


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

    const handleDownloadImage = async () => {
        const element = downloadRef.current;
        const clone = element.cloneNode()
        const canvas = await html2canvas(element, { windowWidth: 1366, windowHeight: 768 });

        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'INVOICE_OKTAN_ITB.png';

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
                        <img src={Logo} alt="" className='object-scale-down w-40' />
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

                    <div className='mt-10'>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Kompetisi</th>
                                        <th>Nama</th>
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
                                </tbody>
                            </table>
                        </div>
                        <div className='text-xs mt-8 mb-3'>Notes : <br />
                            Terimakasih telah ikut berpartisipasi dalam kegiatan kompetisi ini.<br />
                            Tagihan ini merupakan bukti digital yang dibuat secara otomatis <br />
                            yang ditujukan kepada peserta yang telah mendaftar dalam kompetisi OKTAN ITB 2023
                        </div>
                    </div>
                    <hr className='mb-10' />
                </div>
                <div className="card-body pt-0">
                    <div className="flex justify-end  gap-10">
                        <button className='btn btn-primary' onClick={handleDownloadImage}>Download Bukti Tagihan</button>
                        <Link to={`/invoices/me/${invoice.id}/bayar`} className='btn btn-success text-white'>Bayar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetailItem;