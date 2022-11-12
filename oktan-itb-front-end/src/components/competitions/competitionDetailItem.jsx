import React from 'react';
import CompetitionImg from '../../assets/img/competition.jpg';
import { BiTime, BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useGetMyPaperQuery, useGetMyStatusQuery } from '../../services/competitionService';
import Spinner from '../Spinner';
import { MdSchool } from 'react-icons/md';
import { AiOutlineForm } from 'react-icons/ai';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const isRegisterClosed = (Due) => {
    const due = new Date(Due)
    const now = new Date(Date.now())

    if ((due - now) < 0) return true

    return false
}


const CompetitionDetailItem = ({ competition, img }) => {


    const isRegisterClosed = (Due) => {
        const due = new Date(Due)
        const now = new Date(Date.now())

        if ((due - now) < 0) return true

        return false
    }


    const { data: myData, error: myError, isLoading } = useGetMyStatusQuery(competition.id)
    competition = competition ? competition : null

    const { id } = useParams()

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        var myDate = new Date(date);
        // return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
        return myDate.toLocaleDateString('id-ID', options)
    }

    const { data: paper, isLoading: isPapLoading, isError: papError } = useGetMyPaperQuery(id)



    const status = myData?.status ? myData.status : null
    const payment = myData?.status ? myData?.allowedToJoin : null
    const statusMessage = (status === "ENROLLED") ?
        <div className="badge badge-warning mt-2 text-md py-2 px-4 text-white font-semibold">
            Belum bayar
        </div> :
        (status === "ACTIVE") ?
            <div className="badge badge-success mt-2 text-md py-2 px-4 text-white font-semibold">
                Terdaftar
            </div> :
            (status === "PENDING") ?
                <div className="badge badge-warning mt-2 text-md py-2 px-4 text-white font-semibold">
                    Sedang diprosess...
                </div> :
                (status === "PASSED" || status === "DISMISSED") ?
                    <div className="badge badge-danger mt-2 text-md py-2 px-4 text-white font-semibold">
                        Sudah Berakhir
                    </div> : null

    const paymentStatus = (payment === true) ?
        <div className="badge badge-success mt-2 text-md py-4 px-8 text-white font-semibold">
            SUDAH BAYAR
        </div> :
        (payment === false) ?
            <div className="badge badge-warning mt-2 text-md py-4 px-8 text-white font-semibold">
                BELUM BAYAR
            </div> : null

    const checkPaymentMethod = (paymentMethod) => {
        if (paymentMethod === "REQUIRED" || paymentMethod === "REQUIRED") return currencyFormatter.format(competition.entry_fee)
        if (paymentMethod === "FREE") return "GRATIS"
        return ""
    }

    const canUploadPaper = () => {
        if (!status) return false
        let category = competition?.category ? competition?.category : null

        if (category === 'CRYSTAL') return false
        if (status === 'ACTIVE' || status === 'ENROLLED') return true

        return false
    }

    const competitionType = (category) => {
        if (category === 'CRYSTAL') return "Computer Based Test"
        if (category === 'ISOTERM' || status === 'ENROLLED') return "Paper Ilmiah"

        return ""
    }

    if (isLoading || isPapLoading) {
        return <Spinner />
    }

    const haveTeamProfile = () => {
        if (!status) {
            return false
        }
        return (<Link to={`/competition/${competition.id}/profile`} className='btn btn-info text-white btn-sm'>Lihat Profil Saya</Link>)
    }



    const subTheme = competition.competition_sub_themes
    const theme = subTheme.map(name => <div className="badge badge-outline my-1 mr-1 p-2">{name.name}</div>)

    let alreadySubmitted = papError ? false : paper?.file_url ? true : false



    return (
        <div>
            <h1 className='text-2xl font-semibold text-center md:text-left'>{competition.category}</h1>
            <div className="flex flex-wrap">
                <div className='pt-5 w-full  px-4'>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className='card-title flex justify-between text-2xl'>
                                {competition ? competition.title : 'Title'}
                                <div className='lg:flex lg:gap-2'>
                                    {haveTeamProfile()}
                                    {canUploadPaper() ?
                                        <div className="card-actions justify-center mt-10 md:mt-0 md:justify-end">
                                            <Link to={`/competition/${competition.id}/upload`} className="btn btn-primary btn-sm text-white modal-button">{alreadySubmitted ? `Lihat file saya →` : `Upload Karya tulis →`}</Link>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>

                            {statusMessage}
                            <hr />

                            <div className='text-justify my-5' style={{ whiteSpace: "pre-line" }}>{competition.description}</div>

                            <hr className='mb-4' />

                            {(subTheme.length < 1) ? null : <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiCategoryAlt className='inline-block mr-2' />Sub Tema</div>
                                <div className='col-span-4  md:ml-0'>{theme}</div>
                            </div>}

                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiTime className='inline-block mr-2' />Waktu Pelaksanaan</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{formatDate(competition.start_date)} - {formatDate(competition.end_date)}</div>
                            </div>


                            {!myData?.status ? <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><AiOutlineForm className='inline-block mr-2' /> Pendaftaran</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{formatDate(competition.register_start)} - {formatDate(competition.register_due)}</div>
                            </div> : null}

                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><FaUsers className='inline-block mr-2' /> Jumlah Partisipan</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{competition.min_participant}-{competition.max_participant}</div>
                            </div>

                            {competition.payment_method ? <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><FaMoneyBillWave className='inline-block mr-2' /> Biaya Pendaftaran</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{checkPaymentMethod(competition.payment_method)}</div>
                            </div> : null}

                            {competition.payment_method ? <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiPencil className='inline-block mr-2' /> Jenis Perlombaan</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{competitionType(competition.category)}</div>
                            </div> : null}

                            {/* {paymentStatus} */}


                            {isRegisterClosed(competition.register_due) ?
                                <div className="card-actions justify-center mt-10 md:mt-0 md:justify-end">
                                    <button className="btn btn-primary modal-button btn-disabled" disabled="true">Pendaftaran ditutup</button>
                                </div> :
                                !status ?
                                    <div className="card-actions justify-center mt-10 md:mt-0 md:justify-end">
                                        <Link to={`/competition/${competition.id}/enroll`} className="btn btn-primary modal-button" htmlFor="registerCompetitionModal">Daftar</Link>
                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                </div>
                {/* <div className='pt-5 hidden lg:w-1/4 px-4  lg:block '>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="p-2">
                            <img src={CompetitionImg} alt={img} className="rounded-xl w-full" />
                        </figure>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CompetitionDetailItem;