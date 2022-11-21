import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { BiInfoCircle, BiPlusMedical, BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { RichTextEditor } from '../editor'
import { FormButton } from '../editor/FormActions'


const FileContainer = ({ fileName, fileUrl, header }) => {
    return (
        <div>
            <h1 className='font-bold'>{header}</h1>
            <div className='border border-gray-400 p-4 grid grid-cols-6'>
                <div className='col-span-6 md:col-span-5'>
                    <span className='mr-2 font-semibold'>Nama file:</span>
                    <span className='italic font-thin text-xs'>{fileName ? fileName : 'file tidak ditemukan'}</span>
                </div>
                <div className='col-span-6 md:col-span-1 '>
                    <a href={fileUrl} target={'_blank'} className='btn btn-info text-white w-full'>
                        Download
                    </a>
                </div>
            </div>

        </div>
    )
}


export const Requirements = ({ requirement }) => {
    return (
        <>
            <div className='text-info text-lg mb-4'>
                <BiInfoCircle className='inline-block mr-2' />
                Ketentuan
            </div>

            <div className="form-control py-2 bg-base-200 ">
                <RichTextEditor
                    readOnly={true}
                    value={requirement}
                />
            </div>
        </>
    )
}

export const MessagesContainer = ({ value, header }) => {
    return (
        <>
            {header}
            <div className="form-control py-2 bg-base-200 ">
                <RichTextEditor
                    readOnly={true}
                    value={value}
                />
            </div>
        </>
    )
}

export const InformationCard = ({ participant, competition }) => {
    return (
        <div className='lg:col-span-4'>
            <Requirements requirement={competition.precations} />
            <MessagesContainer header={'Pesan dari panitia'} />
        </div>
    )
}

export const ActionsForm = ({ onClick, selected, message }) => {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            message: message || '',
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
                        onChange={dat => { setValue('message', dat) }}
                        value={getValues(message)}
                    />

                </div>


                <div className="btn-group flex justify-center gap-2" key={'status'}>
                    <input {...register('actions')}
                        type="radio"
                        data-title="APPROVE"
                        value='ACCEPT'
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

export const EnrollProfile = ({ enrollData, fileUrl, children, memberData, header }) => {
    const MissingValues = () => {
        return (
            <span className='italic font-thin text-error'>Kosong</span>
        )
    }

    return (
        <div className='lg:col-span-8 order-last lg:order-none card shadow-2xl'>
            <div className='card-title bg-accent p-4 rounded text-white flex justify-between'>
                <span className='uppercase'>{enrollData.team_name}</span>
                {header}
            </div>

            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Pembina</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{enrollData.mentor_name || <MissingValues />}</span>
                    <span className=" col-span-6 md:col-span-3">{enrollData.mentor_number || <MissingValues />}</span>
                </div>

            </div>
            <div className="card-body py-4 divide-y">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Anggota</span>
                </div>
                <div className="grid grid-cols-12 font-semibold text-info">
                    <span className=" col-span-6 md:col-span-3">{memberData.name || <MissingValues />}</span>
                    <span className=" col-span-6 md:col-span-3">{memberData.phone || <MissingValues />}</span>
                </div>
                {
                    enrollData.team_members.map((member, index) => {
                        return (
                            <div className="grid grid-cols-12">
                                <span className=" col-span-1 md:col-span-1">{index + 1}</span>
                                <span className=" col-span-5 md:col-span-2">{member.name || <MissingValues />} </span>
                                <span className=" col-span-6 md:col-span-3">{member.phone || <MissingValues />}</span>
                            </div>
                        )
                    })
                }


            </div>

            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Bukti Peserta</span>
                </div>
                <FileContainer
                    fileName={enrollData.card_file}
                    fileUrl={fileUrl}
                />
            </div>

            <div className="card-actions justify-end p-4">
                {children}
            </div>

        </div>
    )
}

export const FormEnrollNew = ({ participantData, memberData, competitionData, onSubmit, isLoading }) => {
    const payment_method = competitionData.payment_method

    const { control, register, unregister, handleSubmit, getValues, setValue, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            team_name: participantData?.team_name || '',
            team_members: participantData?.team_members || [
                { id: '', name: '', phone: '' }
            ],
            mentor_name: participantData?.mentor_name || '',
            mentor_number: participantData?.mentor_number || '',
            isSendInvoice: false,
            file: {}
        },
        mode: 'onChange'
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "team_members",
        shouldUnregister: true
    });

    useEffect(() => {
        if (payment_method !== 'FREE') {
            setValue('isSendInvoice', true)
        }

    }, [setValue, payment_method])

    const enrollHandle = (data) => {

        const ids = getValues('team_members').map((value) => {
            return value.id
        })
        const names = getValues('team_members').map((value) => {
            return value.name
        })
        const phones = getValues('team_members').map((value) => {
            return value.phone
        })
        onSubmit({ ...data, members_name: names, members_phone: phones, members_ids: ids })
    }

    return (
        <div className='lg:col-span-8 order-last lg:order-none'>

            <form onSubmit={handleSubmit(enrollHandle)}>
                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-2">Nama Tim</label>
                        <input {...register('team_name', {
                            required: 'Harap mengisi nama tim!'
                        })}
                            type="text"
                            placeholder="Nama Tim"
                            className={`input input-bordered md:col-span-10 w-full ${errors.team_name && 'input-error'}`} />
                    </div>
                    {errors.team_name && <span className='text-error text-center'>{errors.team_name.message}</span>}
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-2">Perwakilan</label>
                        <input
                            type="text"
                            value={memberData.name}
                            className="input input-ghost md:col-span-10 w-full text-info" readOnly />
                    </div>
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-12">Nama Pembimbing</label>
                        <input {...register('mentor_name', {
                            required: 'Harap mengisi nama pembimbing'
                        })}
                            type="text"
                            placeholder="Nama pembimbing"
                            className={`input input-bordered md:col-span-12 w-full ${errors.mentor_name && 'input-error'}`}

                        />

                    </div>
                    {errors.mentor_name && <span className='text-error text-center'>{errors.mentor_name.message}</span>}
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-12">Nomor Induk Pembimbing</label>
                        <input {...register('mentor_number', {
                            required: 'Harap mengisi nomer identitas pembimbing',
                        })}
                            type="text"
                            placeholder="Nomer induk pembimbing"
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className={`input input-bordered md:col-span-12 w-full ${errors.mentor_number && 'input-error'}`} />
                    </div>
                    {errors.mentor_number && <span className='text-error text-center'>{errors.mentor_number.message}</span>}
                </div>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Anggota Tim ( {competitionData.min_participant} - {competitionData.max_participant} orang )</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                    <button
                        type='button'
                        onClick={() => append({ id: '', name: '', phone: '' })}
                        className={`btn btn-success btn-square flex-shrink mx-4 
                    ${fields.length > competitionData.max_participant - 2 ? 'btn-disabled' : ''}`}>
                        <BiPlusMedical className='text-xl text-white'

                        />
                    </button>
                </div>
                <div className="form-control">
                    {fields.map((item, index) => {
                        return (

                            <div className="grid gap-2 grid-cols-8 md:grid md:grid-cols-10 md:gap-2 mt-2 border p-2 border-gray-400" key={index}>
                                <div className="col-span-6 md:col-span-9 " >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <div className='col-span-2 md:col-span-1 place-items-start'>
                                            <span className="label">Nama peserta - {index + 2}</span>
                                            <input type="text" {...register(`team_members.${index}.name`, {
                                                required: 'Harap mengisi nama anggota yang akan didaftarkan!'
                                            })}
                                                placeholder="Nama Anggota"
                                                className={`input input-bordered w-full ${errors?.['team_members']?.[index]?.['name']?.message && 'input-error'}`} />


                                            {errors.team_members && <span className='text-error text-center'>{errors?.['team_members']?.[index]?.['name']?.message}</span>}
                                        </div>

                                        <div className='col-span-2 md:col-span-1'>
                                            <label className="label">No Hp</label>
                                            <input type="text" {...register(`team_members.${index}.phone`, {
                                                required: 'Harap mengisi nomer hp anggota yang akan didaftarkan!',
                                                pattern: {
                                                    value: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g,
                                                    message: "Harap masukan nomer yang valid!"
                                                }
                                            }
                                            )}
                                                placeholder="No Hp Anggota"
                                                className={`input input-bordered w-full ${errors?.['team_members']?.[index]?.['phone']?.message && 'input-error'}`}

                                            />
                                            {errors.team_members && <span className='text-error text-center'>{errors?.['team_members']?.[index]?.['phone']?.message}</span>}
                                        </div>
                                    </div>

                                </div>
                                <div className='col-span-2 md:col-span-1 place-self-center md:place-self-end'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            remove(index)
                                        }}
                                        className={`btn btn-error btn-square 
                                        ${fields.length < competitionData.min_participant ?
                                                'btn-disabled' : ''}`}>
                                        <BiTrash className='text-xl text-white'

                                        />
                                    </button>
                                </div>

                            </div>


                        )
                    })}



                </div>

                <div className="form-control py-2">

                    <label className="label md:col-span-4 ">
                        Upload Bukti Peserta
                        <div className='text-sm font-semibold'>
                            max 2 mb {'(.pdf)'}
                        </div>
                    </label>

                    <input {...register('file', {
                        required: 'Harap mengunggah file yang diminta!',
                        validate: {
                            lessThan2Mb: (f) => f[0]?.size < (2 * 1024 * 1024) || 'Harus kurang dari 2 mb!',
                            acceptedFormats: (f) => ['application/pdf'].includes(f[0]?.type) || 'Hanya menerima file dalam bentuk .pdf!'
                        }
                    })}
                        type="file"
                        accept='application/pdf'
                        className={`file-input ${errors.file && 'input-error'}  md:col-span-8`} />

                    {errors.file && <span className='text-error'>{errors.file.message}</span>}
                </div>

                <div className="form-control py-2 mt-6">
                    <div className="grid grid-cols-12 gap-4">
                        <div className='col-span-4'></div>
                        <Link to={-1} className='btn btn-error text-white col-span-4'>Cancel</Link>
                        <FormButton
                            type={'submit'}
                            className='btn btn-success text-white col-span-4'
                            isLoading={isLoading}
                        >
                            Daftar
                        </FormButton>
                    </div>
                </div>
            </form>

        </div >
    )

}

export const FormEnrollUpdate = ({ participantData, memberData, competitionData, onSubmit, isLoading, onCancel }) => {
    const { control, register, unregister, handleSubmit, getValues, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            team_name: participantData?.team_name || '',
            team_members: participantData?.team_members || [
                { id: '', name: '', phone: '' }
            ],
            mentor_name: participantData?.mentor_name || '',
            mentor_number: participantData?.mentor_number || '',
        },
        mode: 'onChange'
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "team_members",
        shouldUnregister: true
    });

    const enrollHandle = (data) => {

        const ids = getValues('team_members').map((value) => {
            return value.id
        })
        const names = getValues('team_members').map((value) => {
            return value.name
        })
        const phones = getValues('team_members').map((value) => {
            return value.phone
        })
        onSubmit({ ...data, members_name: names, members_phone: phones, members_ids: ids })
    }

    return (
        <div className='lg:col-span-8 order-last lg:order-none'>

            <form onSubmit={handleSubmit(enrollHandle)}>
                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-2">Nama Tim</label>
                        <input {...register('team_name', {
                            required: 'Harap mengisi nama tim!'
                        })}
                            type="text"
                            placeholder="Nama Tim"
                            className={`input input-bordered md:col-span-10 w-full ${errors.team_name && 'input-error'}`} />
                    </div>
                    {errors.team_name && <span className='text-error text-center'>{errors.team_name.message}</span>}
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-2">Perwakilan</label>
                        <input
                            type="text"
                            value={memberData.name}
                            className="input input-ghost md:col-span-10 w-full text-info" readOnly />
                    </div>
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-12">Nama Pembimbing</label>
                        <input {...register('mentor_name', {
                            required: 'Harap mengisi nama pembimbing'
                        })}
                            type="text"
                            placeholder="Nama pembimbing"
                            className={`input input-bordered md:col-span-12 w-full ${errors.mentor_name && 'input-error'}`}

                        />

                    </div>
                    {errors.mentor_name && <span className='text-error text-center'>{errors.mentor_name.message}</span>}
                </div>

                <div className="form-control py-2">
                    <div className="md:grid md:grid-cols-12">
                        <label className="label md:col-span-12">Nomor Induk Pembimbing</label>
                        <input {...register('mentor_number', {
                            required: 'Harap mengisi nomer identitas pembimbing',
                        })}
                            type="text"
                            placeholder="Nomer induk pembimbing"
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className={`input input-bordered md:col-span-12 w-full ${errors.mentor_number && 'input-error'}`} />
                    </div>
                    {errors.mentor_number && <span className='text-error text-center'>{errors.mentor_number.message}</span>}
                </div>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Anggota Tim ( {competitionData.min_participant} - {competitionData.max_participant} orang )</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                    <button
                        type='button'
                        onClick={() => append({ id: '', name: '', phone: '' })}
                        className={`btn btn-success btn-square flex-shrink mx-4 
                    ${fields.length > competitionData.max_participant - 2 ? 'btn-disabled' : ''}`}>
                        <BiPlusMedical className='text-xl text-white'

                        />
                    </button>
                </div>
                <div className="form-control">
                    {fields.map((item, index) => {
                        return (

                            <div className="grid gap-2 grid-cols-8 md:grid md:grid-cols-10 md:gap-2 mt-2 border p-2 border-gray-400" key={index}>
                                <div className="col-span-6 md:col-span-9 " >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <div className='col-span-2 md:col-span-1 place-items-start'>
                                            <span className="label">Nama peserta - {index + 2}</span>
                                            <input type="text" {...register(`team_members.${index}.name`, {
                                                required: 'Harap mengisi nama anggota yang akan didaftarkan!'
                                            })}
                                                placeholder="Nama Anggota"
                                                className={`input input-bordered w-full ${errors?.['team_members']?.[index]?.['name']?.message && 'input-error'}`} />


                                            {errors.team_members && <span className='text-error text-center'>{errors?.['team_members']?.[index]?.['name']?.message}</span>}
                                        </div>

                                        <div className='col-span-2 md:col-span-1'>
                                            <label className="label">No Hp</label>
                                            <input type="text" {...register(`team_members.${index}.phone`, {
                                                required: 'Harap mengisi nomer hp anggota yang akan didaftarkan!',
                                                pattern: {
                                                    value: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g,
                                                    message: "Harap masukan nomer yang valid!"
                                                }
                                            }
                                            )}
                                                placeholder="No Hp Anggota"
                                                className={`input input-bordered w-full ${errors?.['team_members']?.[index]?.['phone']?.message && 'input-error'}`}

                                            />
                                            {errors.team_members && <span className='text-error text-center'>{errors?.['team_members']?.[index]?.['phone']?.message}</span>}
                                        </div>
                                    </div>

                                </div>
                                <div className='col-span-2 md:col-span-1 place-self-center md:place-self-end'>
                                    <button
                                        type='button'
                                        onClick={() => {

                                            remove(index)
                                        }
                                        }
                                        className={`btn btn-error btn-square 
                                        ${fields.length < competitionData.min_participant ?
                                                'btn-disabled' : ''}`}>
                                        <BiTrash className='text-xl text-white'

                                        />
                                    </button>
                                </div>

                            </div>


                        )
                    })}



                </div>

                <div className="form-control py-2 mt-6">
                    <div className="grid grid-cols-12 gap-4">

                        <FormButton
                            type={'button'}
                            onClick={onCancel}
                            isLoading={isLoading}
                            className='btn btn-error text-white col-span-4'>Cancel</FormButton>
                        <FormButton
                            type={'button'}
                            onClick={() => reset()}
                            isLoading={isLoading}
                            className='btn btn-warning  col-span-4'>Reset</FormButton>
                        <FormButton
                            type={'submit'}
                            className='btn btn-success text-white col-span-4'
                            isLoading={isLoading}
                        >
                            Update
                        </FormButton>
                    </div>
                </div>
            </form>

        </div >
    )

}


export const CardUpload = ({ onSubmit, isLoading, onCancel }) => {
    const { control, setFocus, register, handleSubmit, getValues, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            file: {}
        },
        mode: 'onChange'
    })

    const enrollHandle = (data) => {
        onSubmit({ ...data })
    }

    useEffect(() => {
        setFocus('file')
    }, [setFocus])

    return (
        <div className='lg:col-span-8 order-last lg:order-none shadow-xl rounded-xl'>

            <form onSubmit={handleSubmit(enrollHandle)} className='card '>

                <div className="card-title p-4 bg-warning">
                    <h1>Upload ulang</h1>
                </div>

                <div className="form-control py-2 card-body">

                    <label className="label md:col-span-4 ">
                        Upload Bukti Peserta
                        <div className='text-sm font-semibold'>
                            max 2 mb {'(.pdf)'}
                        </div>
                    </label>

                    <input {...register('file', {
                        required: 'Harap mengunggah file yang diminta!',
                        validate: {
                            lessThan2Mb: (f) => f[0]?.size < (2 * 1024 * 1024) || 'Harus kurang dari 2 mb!',
                            acceptedFormats: (f) => ['application/pdf'].includes(f[0]?.type) || 'Hanya menerima file dalam bentuk .pdf!'
                        }
                    })}
                        type="file"
                        accept='application/pdf'
                        className={`file-input ${errors.file && 'input-error'}  md:col-span-8`} />

                    {errors.file && <span className='text-error'>{errors.file.message}</span>}
                </div>

                <div className="form-control py-2 mt-6 card-body">
                    <div className="grid grid-cols-12 gap-4">
                        <div className='col-span-4'></div>
                        <FormButton
                            type={'button'}
                            onClick={onCancel}
                            isLoading={isLoading}
                            className='btn btn-error text-white col-span-4'>Cancel</FormButton>
                        <FormButton
                            type={'submit'}
                            className='btn btn-success text-white col-span-4'
                            isLoading={isLoading}
                        >
                            Kirim Ulang
                        </FormButton>
                    </div>
                </div>
            </form>

        </div >
    )

}


const FormEnrollItem = ({ participant }) => {
    return (
        <>
            <div className="grid lg:grid-cols-12 lg:gap-4">
                {!participant.isEnrolled ?
                    <FormEnrollNew participantData={participant.enroll} memberData={participant.member} competitionData={participant.competition} /> : null
                }

                {participant.isEnrolled ?
                    <EnrollProfile>
                        <div className="btn btn-success">Ubah Data</div>
                        <div className="btn btn-success">Ganti bukti</div>
                    </EnrollProfile> : null
                }

                <InformationCard competition={participant.competition} />
            </div>
        </>
    )
}

export default FormEnrollItem