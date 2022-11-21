import React from 'react'
import { useForm } from 'react-hook-form'
import { useGetPapersByParIdQuery } from '../../features/competitions/submissionSlice'
import { RichTextEditor } from '../editor'



export const ReviewActions = ({ onSubmit, children }) => {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            message: '',
            score: '',
        },
        mode: 'onChange'
    })

    const onClickHandle = (data) => {
        onSubmit(data)
    }

    return (
        <div className="form-control ">
            <form onSubmit={handleSubmit(onClickHandle)}>

                <div className='mb-5'>
                    <RichTextEditor
                        placeholder={'tulis pesan...'}
                        onChange={dat => { setValue('message', dat) }}
                        value={getValues('message')}
                    />
                </div>

                <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                    <label className="label col-span-1">
                        <span className="label-text">Nilai</span>
                    </label>
                    <input {...register('score', {
                        validate: {
                            lessthanzero: v => parseInt(v) > 0 || 'Must be > 0',
                            greaterthanonehundred: v => parseInt(v) < 100 || 'Must be < 100'
                        }
                    })}
                        type={'number'}
                        className={`input input-bordered col-span-5 ${errors.score && 'input-error'}`}
                    />
                    {errors.score &&
                        <span className='font-semibold text-error place-self-center lg:col-span-6'>
                            {errors.score.message}
                        </span>
                    }
                </div>

                <div className="form-control py-2 mt-6">
                    <div className="grid grid-cols-4 gap-4">
                        {children}
                        <input type="submit"
                            class="btn btn-primary px-10 col-span-4"
                            value={'Review'} />
                    </div>
                </div>
                {errors.action && <span>error</span>}
            </form>

        </div>
    )
}


export const FileContainer = ({ participantId }) => {
    const {
        data,
        isLoading,
        error,
    } = useGetPapersByParIdQuery({ participantId: participantId })

    if (isLoading) {
        return <>....</>
    }

    if (error) {
        return <>Terjadi kesalahan saat memuat data</>
    }

    return (
        <div className='my-6 border p-4'>
            <div className="grid grid-cols-4 ">
                <div className="col-span-1">
                    Nama File
                </div>
                <div className="col-span-3 text-xs font-thin italic">
                    {data.attachment}
                </div>
            </div>

            <div className="grid grid-cols-4 mt-4 ">
                <div className="col-span-4">
                    <a href={data.file_url} target={'_blank'} className='btn btn-block btn-info'>Download</a>
                </div>
            </div>

        </div>
    )
}

export const StatusBadge = ({ status }) => {
    const display = {
        PENDING: 'Harap upload Ulang',
        SENT: 'Belum diperiksa',
        REVIEWED: 'Sudah diperiksa'
    }

    const className = {
        SENT: 'badge badge-outline  p-4 badge-secondary',
        PENDING: 'badge badge-outline  p-4 ',
        REVIEWED: 'badge  badge-outline p-4 badge-info',
    }


    return (
        <div className={className[status]}>{display[status]}</div>
    )
}


export const UploadBox = () => {
    return (
        < div className="max-w-xl" >
            <label
                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline">browse</span>
                    </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
            </label>
        </div >
    )
}


export const SubmissionFormItems = ({ submissionData, readOnly, onSubmit, children, competitionData, title, fileContainer }) => {
    const { control, register, unregister, handleSubmit, getValues, setValue, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            title: submissionData?.title || '',
            theme: submissionData?.theme || '',
            file: {}
        },
        mode: 'onChange'
    })


    return (
        <div className="card bg-base-100 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <label className='font-semibold text-primary text-sm mt-5'>
                        {title ? title : 'Masukkan Informasi Karya Ilmiah'}

                    </label>
                    <hr />

                    <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                        <label className="label col-span-1">
                            <span className="label-text">Judul</span>
                        </label>
                        <input type="text"
                            {...register('title', {
                                required: 'Harap isi judul!',
                                disabled: readOnly
                            })}
                            placeholder="Judul Karya Ilmiah"
                            className={`input input-bordered col-span-5 ${errors.title && 'input-error'}`}
                        />
                        {errors.title &&
                            <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                {errors.title.message}
                            </span>
                        }
                    </div>

                    <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                        <label className="label col-span-1">
                            <span className="label-text">Tema</span>
                        </label>
                        <div className="col-span-5">
                            <select
                                {...register('theme', {
                                    required: 'Harap sertakan tema yang akan dipilih!',
                                    disabled: readOnly
                                })}
                                className={`select select-bordered overflow-x-hidden ${errors.theme && 'select-error'}`}
                            >
                                <option value={''} disabled selected>Pilih Sub Tema</option>
                                {
                                    competitionData?.competition_sub_themes.map(theme => {
                                        return (
                                            <option value={theme.name}>{theme.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        {errors.theme &&
                            <span className='font-semibold text-error place-self-center lg:col-span-6'>
                                {errors.theme.message}
                            </span>
                        }

                    </div>

                    {fileContainer}

                    {!readOnly &&
                        <>
                            <div className="alert shadow-sm my-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-secondary flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span className='text-justify'>Harap baca Ketentuan terlebih dahulu dengan seksama. File hanya bisa diupload sekali oleh karena itu harap berhati hati sebelum memilih file! Apabila terjadi kesalahan, harap hubungi panitia. </span>
                                </div>
                            </div>

                            <div className="form-control py-2">

                                <label className="label md:col-span-4 ">
                                    Upload Karya Imilah
                                    <div className='text-sm font-semibold'>
                                        max 5 mb {'(.pdf)'}
                                    </div>
                                </label>

                                <input {...register('file', {
                                    required: 'Harap mengunggah file karya ilimah!',
                                    validate: {
                                        lessThan2Mb: (f) => f[0]?.size < (5 * 1024 * 1024) || 'Harus kurang dari 5 mb!',
                                        acceptedFormats: (f) => ['application/pdf'].includes(f[0]?.type) || 'Hanya menerima file dalam bentuk .pdf!'
                                    }
                                })}
                                    type="file"
                                    accept='application/pdf'
                                    className={`file-input file-input-primary ${errors.file && 'input-error'}  md:col-span-8`} />

                                {errors.file && <span className='text-error'>{errors.file.message}</span>}
                            </div>

                        </>
                    }


                    <div className="flex justify-end gap-2 mt-8">
                        {children}
                    </div>

                </div>
            </form>
        </div>
    )
}


const SubmissionsItems = () => {
    return (
        <div>SubmissionsItems</div>
    )
}

export default SubmissionsItems