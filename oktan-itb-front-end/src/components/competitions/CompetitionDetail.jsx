import React from 'react'
import { BsHourglassSplit, BsClockHistory, BsCalendar3, BsFillPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RichTextEditor } from '../editor'
import useCurrencyFormat from '../hooks/useCurrencyFormat'
import { useFormatDate } from '../hooks/useFormatDate'



export const SubmitButton = () => {
    return (
        <button className='btn btn-primary' > Submit Papper</button>
    )
}

export const EnrollLinkButton = () => {
    return (
        <Link
            to={'enroll'}
            className='btn btn-info text-white'>Daftar Lomba</Link>
    )
}

export const ProfileLinkButton = ({ messages }) => {
    let haveEmpty = false

    const emptyMessage = messages.map(message => {
        if (message.type === 'MISSING_VALUES') {
            return haveEmpty = true
        }
    })

    return (
        <div className="indicator">
            {haveEmpty ?
                <span className="indicator-item badge badge-error text-white">!</span> : null
            }

            <Link to={'enroll'} className='btn btn-primary'>
                View Profile
            </Link>
        </div>

    )
}

export const StatusBadge = ({ data }) => {
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
        dispalyMessage.tooltipAllowed = 'Sedang menunggu konfirmasi dari panitia'
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

export const SubThemesList = ({ subThemes }) => {

    return (
        <dl className="text-gray-600 ">
            {subThemes.map((list) => {
                return (
                    <div className="flex flex-col pb-3 border p-3">
                        <dd className="text font-semibold">{list.name}</dd>
                    </div>
                )
            })}
        </dl>
    )
}

export const RichTextDropDown = ({ texts, header }) => {
    return (
        <div className="py-2">
            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                    {header}
                </div>
                <div className="collapse-content bg-base-100 p-0">
                    <RichTextEditor
                        value={texts}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    )

}


export const EnventsTimeDropDown = ({ competition }) => {
    const registerStart = useFormatDate(competition.register_start)
    const registerEnd = useFormatDate(competition.register_due)
    const eventStart = useFormatDate(competition.start_date)
    const eventEnd = useFormatDate(competition.end_date)

    return (
        <div className="py-2">
            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                    Pelaksanaan
                </div>
                <div className="collapse-content bg-base-100 p-0">
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
                </div>
            </div>
        </div>


    )
}


export const SubThemeDropDown = ({ tag, subThemes }) => {
    return (
        <div className="py-2">
            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 rounded-box">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                    {tag}
                </div>
                <div className="collapse-content bg-base-100 p-0">
                    {subThemes.length > 0
                        ? <SubThemesList subThemes={subThemes} />
                        : <EmptySubThemes tag={tag} />}
                </div>
            </div>
        </div>

    )
}

const ClosedEvent = () => ({

})

export const CompetitionFees = ({ price, paymentMethod }) => {
    const fees = useCurrencyFormat(price)
    const priceTag = paymentMethod === 'FREE' ? 'GRATIS' : fees

    return (
        <h2 className='text-xl font-semibold text-right text-orange-600 py-2'>
            {priceTag}
        </h2>
    )
}

