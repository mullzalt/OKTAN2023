import React from 'react'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { BiPlusMedical, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSaveCompetitionMutation } from '../../../features/competitions/competitionSlice'
import { RichTextEditor } from '../../editor'
import { useDateFormatYMD } from '../../hooks/useFormatDate'



const CompetitionForm = ({ competition, onSave }) => {
    const { register, setValue, getValues, control, handleSubmit, reset, trigger, setError } = useForm({
        defaultValues: {
            category: competition.category || 'ISOTERM',
            title: competition.title || '',
            description: competition.description || '',
            precations: competition.precations || '',
            min_participant: competition.min_participant || 1,
            max_participant: competition.max_participant || 1,

            exam_type: competition.exam_type,

            register_start: useDateFormatYMD(competition.register_start) || '',
            register_due: useDateFormatYMD(competition.register_due) || '',
            start_date: useDateFormatYMD(competition.start_date) || '',
            end_date: useDateFormatYMD(competition.end_date) || '',

            competition_sub_themes: competition.competition_sub_themes || [],

            payment_method: competition.payment_method || 'FREE',
            entry_fee: competition.entry_fee || 0,
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "competition_sub_themes"
    });

    useEffect(() => {
        register('description')
        register('precations')

    }, [register])

    const onDescChange = (desc) => {
        setValue('description', desc)
    }

    const onPrecautionsChange = (prec) => {
        setValue('precations', prec)
    }

    const onSubmit = async (data) => {
        const subThemeIds = getValues('competition_sub_themes').map((value) => {
            return value.id
        })

        const subThemeNames = getValues('competition_sub_themes').map((value) => {
            return value.name
        })
        const dataToSave = { ...data, subThemeId: subThemeIds, subThemeName: subThemeNames }

        onSave(dataToSave)
    }


    return (
        <React.Fragment>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-3">
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Category</label>
                            <div className="md:col-span-10">
                                <div className="flex gap-3">
                                    <label className="label cursor-pointer">
                                        <input {...register('category')}
                                            type="radio"
                                            value={'ISOTERM'}
                                            className="radio mr-2" />
                                        <span className="label-text">ISOTERM</span>
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input {...register('category')}
                                            type="radio"
                                            value={'CRYSTAL'}
                                            className="radio mr-2" />
                                        <span className="label-text">CRYSTAL</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Tipe Lomba</label>
                            <div className="md:col-span-10">
                                <div className="flex gap-3">
                                    <label className="label cursor-pointer">
                                        <input {...register('exam_type')}
                                            type="radio"
                                            value={'CBT'}
                                            className="radio mr-2" />
                                        <span className="label-text">CBT</span>
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input {...register('exam_type')}
                                            type="radio"
                                            value={'PAPER'}
                                            className="radio mr-2" />
                                        <span className="label-text">PAPER</span>
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input {...register('exam_type')}
                                            type="radio"
                                            value={'ABSTRACT'}
                                            className="radio mr-2" />
                                        <span className="label-text">ABSTRAK</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Judul</label>
                            <input {...register('title')}
                                type="text"
                                placeholder="Judul"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Sub Tema</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                        <button
                            onClick={() => append({ id: '', name: '' })}
                            type='button'
                            className="btn btn-success btn-square flex-shrink mx-4">
                            <BiPlusMedical className='text-xl text-white' />
                        </button>
                    </div>

                    <div className="form-control py-2">
                        <div className="grid gap-2 grid-cols-8 md:grid md:grid-cols-12 md:gap-2">
                            {fields.map((item, index) => {
                                return (
                                    <React.Fragment>
                                        <label className="label col-span-2 md:col-span-2">Sub Tema {index + 1}</label>
                                        <div className="input-group col-span-5 md:col-span-9"
                                            key={item.id}>
                                            <input {...register(`competition_sub_themes.${index}.name`)}
                                                type="text"
                                                placeholder="Sub Tema"
                                                className="input input-bordered w-full" />
                                        </div>
                                        <button
                                            onClick={() => remove(index)}
                                            type='button'
                                            className='btn btn-error md:col-span-1'>
                                            <BiTrash className='text-xl text-white' />
                                        </button>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Anggota Tim</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>


                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12 md:gap-2">
                            <label className="label md:col-span-2">Jumlah Peserta</label>
                            <input {...register('min_participant')}
                                type="number"
                                placeholder="Min. Peserta"
                                className="input input-bordered md:col-span-5" />
                            <input {...register('max_participant')}
                                type="text"
                                placeholder="Max. Peserta"
                                className="input input-bordered md:col-span-5" />
                        </div>
                    </div>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Pelaksanaan</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Pembukaan Daftar</label>
                            <input {...register('register_start', { valueAsDate: false })}
                                type="date"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Penutupan Daftar</label>
                            <input {...register('register_due', { valueAsDate: false })}
                                type="date"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Mulai Acara</label>
                            <input {...register('start_date', { valueAsDate: false })}
                                type="date"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Selesai Acara</label>
                            <input {...register('end_date', { valueAsDate: false })}
                                type="date"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>


                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Pembayaran</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Metode Pembayaran</label>
                            <div className="md:col-span-10">
                                <div className="flex gap-3">
                                    <div className="tooltip" data-tip="Peserta tidak dipungut biaya">
                                        <label className="label cursor-pointer">
                                            <input {...register('payment_method')}
                                                type="radio"
                                                value={'FREE'}
                                                className="radio mr-2" />
                                            <span className="label-text">GRATIS</span>
                                        </label>
                                    </div>
                                    <div className="tooltip" data-tip="Peserta harus membayar sebelum mengikuti lomba">
                                        <label className="label cursor-pointer">
                                            <input {...register('payment_method')}
                                                type="radio"
                                                value={'LATER'}
                                                className="radio mr-2" />
                                            <span className="label-text">BAYAR DI MUKA</span>
                                        </label>
                                    </div>
                                    <div className="tooltip" data-tip="Peserta diberi tagihan, namun dapat ikut sebelum membayar">
                                        <label className="label cursor-pointer">
                                            <input {...register('payment_method')}
                                                type="radio"
                                                value={'REQUIRED'}
                                                className="radio mr-2" />
                                            <span className="label-text">BAYAR NANTI</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Biaya Pendaftaran</label>
                            <input {...register('entry_fee', { setValueAs: v => parseInt(v) })}
                                type="number"
                                placeholder="Biaya Pendaftaran"
                                className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>

                </div>
                <hr className='mb-4' />
                <div className="mb-4">
                    <div className='font-semibold'>Deskripsi Kompetisi</div>
                    <RichTextEditor
                        placeholder={'Tuliskan deskripsi....'}
                        onChange={onDescChange}
                        value={getValues('description')}
                    />
                </div>

                <hr className='mb-4' />
                <div className="mb-4">
                    <div className='font-semibold'>Persyaratan Kompetisi</div>
                    <RichTextEditor
                        placeholder={'Tuliskan persyaratan....'}
                        onChange={onPrecautionsChange}
                        value={getValues('precations')}
                    />
                </div>

                <div className="flex  gap-2">
                    <button
                        onClick={() => reset()}
                        type='button'
                        className='btn btn-error text-white'>Kembalikan Semula</button>
                    <input type='submit' className='btn btn-success text-white' value={'Simpan Perubahan'} />
                    {competition.visible === false
                        ? <button type='button' className='btn btn-primary text-white'>Publish</button> :
                        competition.visible === true ?
                            <button type='button' className='btn btn-warning '>Draft</button>
                            : null
                    }


                </div>
            </form>
        </React.Fragment>
    )
}

export default CompetitionForm