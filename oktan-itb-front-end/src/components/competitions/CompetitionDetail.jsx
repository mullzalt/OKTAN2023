import React from 'react'
import { BsHourglassSplit, BsClockHistory, BsCalendar3, BsFillPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RichTextEditor } from '../editor'
import useCurrencyFormat from '../hooks/useCurrencyFormat'
import { useFormatDate } from '../hooks/useFormatDate'



const SubmitButton = () => {
    return (
        <button className='btn btn-primary' > Submit Papper</button>
    )
}
const EnrollButton = ({ id }) => {
    return (
        <Link
            to={'enroll'}
            className='btn btn-info text-white'>Daftar Lomba</Link>
    )
}

const ProfileButton = () => {
    return (
        <button className='btn btn-primary'>View Profile</button>
    )
}

const StatusBadge = ({ data }) => {
    const isAllowed = data.allowedToJoin
    const status = data.status

    const dispalyMessage = {
        allowed: <p className='text-warning font-bold'>Belum bayar</p>,
        status: <p className=' font-bold'>Belum terverivikasi</p>,
        tooltipAllowed: 'Belum memenuhi semua syarat',

    }

    if (isAllowed) {
        dispalyMessage.allowed = <p className='text-success text-xl font-bold'><BsFillPatchCheckFill /></p>
    }

    if (status !== 'ENROLLED' && status !== 'PENDING') {
        dispalyMessage.status = ''
    }

    if (status !== 'ENROLLED' && status !== 'PENDING' && isAllowed) {
        dispalyMessage.tooltipAllowed = 'Sudah memenuhi semua syarat'
    }

    if (status === 'ENROLLED') {
        dispalyMessage.status = <p className='text-info font-bold'>Menunggu verivikasi...</p>
    }


    return (
        <div className="tooltip" data-tip={dispalyMessage.tooltipAllowed}>
            <div className="badge badge-ghost p-4 mr-2 gap-2">{dispalyMessage.allowed} {dispalyMessage.status}</div>
        </div>

    )
}

const EmptySubThemes = ({ tag }) => {
    return (
        <dl className="text-gray-600 divide-y divide-gray-200  p-10">
            <div className="flex flex-col pb-3 text-center">
                <dt className="mb-1 text-gray-500 md:text-lg ">...</dt>
                <dd className="text-lg font-semibold">Belum ada {tag} yang disertakan</dd>
            </div>

        </dl>
    )
}

const SubThemesList = ({ sub_themes }) => {


    return (
        <dl className="text-gray-600 ">
            {sub_themes.map((list) => {
                return (
                    <div className="flex flex-col pb-3 border p-3">
                        <dd className="text font-semibold">{list.name}</dd>
                    </div>
                )
            })}
        </dl>
    )
}

const EnventsTime = ({ competition }) => {
    const registerStart = useFormatDate(competition.register_start)
    const registerEnd = useFormatDate(competition.register_due)
    const eventStart = useFormatDate(competition.start_date)
    const eventEnd = useFormatDate(competition.end_date)

    return (
        <dl className="text-gray-600 ">
            <div className="flex flex-col pb-3 border p-3">
                <dt className="mb-1 text-gray-500 md:text-lg "><BsClockHistory className='inline-block text-xl mr-4' />Pembukaan Daftar</dt>
                <dd className="text font-semibold text-lg p-2">{registerStart}</dd>
            </div>
            <div className="flex flex-col pb-3 border p-3">
                <dt className="mb-1 text-gray-500 md:text-lg "><BsHourglassSplit className='inline-block text-xl mr-4' /> Penutupan Daftar</dt>
                <dd className="text font-semibold text-lg p-2">{registerEnd}</dd>
            </div>
            <div className="flex flex-col pb-3 border p-3">
                <dt className="mb-1 text-gray-500 md:text-lg "><BsCalendar3 className='inline-block text-xl mr-4' /> Pelaksanaan</dt>
                <dd className="text font-semibold text-lg p-2">{eventStart} s/d {eventEnd}</dd>
            </div>
        </dl>
    )
}

const ClosedEvent = () => ({

})

const CompetitionDetail = ({ competition }) => {
    const payment_method = competition.payment_method
    const entryFee = useCurrencyFormat(competition.entry_fee)
    const fee = payment_method === 'FREE' ? 'GRATIS' : entryFee

    const subThemeTag = {
        ISOTERM: 'Sub-tema',
        CRYSTAL: 'Materi'
    }

    const examTag = {
        ABSTRACT: 'Pengumpulan abstrak',
        PAPER: 'Pengumpulan karya ilmiah',
        CBT: 'Test Berbasis Komputer (CBT)'
    }

    return (
        <div>
            <div className="flex justify-between py-2">
                <div>
                    <h2 className='text-xl font-bold'>
                        {competition.category}
                        <span className='text-xs font-semibold inline-block mx-2'>
                            {'( '}{examTag[competition.exam_type]}{' )'}
                        </span>
                    </h2>

                    <p>{competition.title}</p>

                </div>
                <div>
                    {/* Badge here and profie */}
                    {competition.isParticipating && competition.participant_data ? <StatusBadge data={competition.participant_data} /> : null}
                    {competition.isParticipating ? <ProfileButton /> : null}

                </div>
            </div>

            <div className="py-2">
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold">
                        Deskripsi
                    </div>
                    <div className="collapse-content bg-base-100 p-0">
                        <RichTextEditor
                            value={competition.description}
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold">
                        {subThemeTag[competition.category]}
                    </div>
                    <div className="collapse-content bg-base-100 p-0">
                        {competition.competition_sub_themes.length > 0 ? <SubThemesList sub_themes={competition.competition_sub_themes} /> : <EmptySubThemes tag={subThemeTag[competition.category]} />}
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold">
                        Pelaksanaan
                    </div>
                    <div className="collapse-content bg-base-100 p-0">
                        <EnventsTime competition={competition} />
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold">
                        Syarat dan Ketentuan
                    </div>
                    <div className="collapse-content bg-base-100 p-0">
                        <RichTextEditor
                            value={competition.precations}
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>

            <h2 className='text-xl font-semibold text-right text-orange-600 py-2'>
                {!competition.isParticipating && competition.isRegisterOpen ?
                    fee : null
                }
            </h2>

            <div className="flex justify-end gap-2 py-2">
                {!competition.isParticipating && competition.isRegisterOpen ?
                    <EnrollButton /> : null
                }

            </div>
        </div>
    )
}

export default CompetitionDetail