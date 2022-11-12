import axios from 'axios';
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import { selectCurrentUser } from '../../services/auth/authSlice';
import Spinner from '../Spinner';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useSendInvoceMutation } from '../../services/invoiceService';
import { useEffect } from 'react';
import { useEnrollCompetitionMutation } from '../../services/competitionService';



const isSendInvoice = (payemntMethod) => {
    if (payemntMethod === "FREE") return false

    return true
}

const navigateTo = () => {

}




const FormEnrollCompetition = ({ competition }) => {


    const navigate = useNavigate()

    const [state, setState] = useState({
        error: false,
        loading: false,
        message: '',
        success: false
    })

    const enrollApi = async (id, token, FormData) => {
        setState((prevState) => ({
            ...prevState,
            error: false,
            loading: true
        }))
        await axios.post(`${API_URL}/v1/competitions/${id}/enroll`, FormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
            .then((data => {
                setState((prevState) => ({
                    ...prevState,
                    error: false,
                    loading: false
                }))

                return data

            }))
            .catch((err) => {
                setState((prevState) => ({
                    ...prevState,
                    error: true,
                    loading: false
                }))


                return err
            })
    }


    const minParticipant = () => {
        let arr = []
        for (let i = 0; i < competition.min_participant - 1; i++) {
            arr[i] = ''
        }
        return arr
    }

    let { id } = useParams()
    const [inputFieldStatic, setInputStatic] = useState({
        teamName: '',
        file: {}
    })


    const [inputName, setInputName] = useState(minParticipant)


    const user = useSelector(selectCurrentUser)
    const leader = user?.profile?.name ? user?.profile.name : null

    let token = user.token


    const addNewField = (e) => {
        const max = competition.max_participant - 1
        const canAdd = (inputName.length < (max)) ? true : false
        if (canAdd) {
            setInputName([...inputName, ''])
        }

    }

    const removeField = (index) => {
        const min = competition.min_participant - 1
        const canRemove = (inputName.length > (min)) ? true : false
        if (canRemove) {
            let field = [...inputName]
            field.splice(index, 1)
            setInputName(field)
            return
        }
        else {

        }

    }

    const onNameChange = (i, e) => {
        let name = [...inputName];
        name[i] = e.target.value;
        setInputName(name)
    }

    const onFileChange = (e) => {
        let size_limit = 2 * 1024 * 1024
        let filename = e.target.files[0].name
        let filesize = e.target.files[0].size
        let filetype = e.target.files[0].type

        let isLarger = filesize > size_limit ? true : false
        let ext = filename.match(/\.([^\.]+)$/)[1]

        if (isLarger) {
            setState((prevState) => ({ ...prevState, error: true, loading: false, message: 'File can not exceed 2MB!' }));
            return
        }

        if (typeof filename === "undefined" || ext.indexOf("pdf") < 0) {
            setState((prevState) => ({ ...prevState, error: true, loading: false, message: 'Only upload .pdf!' }));
            return
        }

        if (ext.indexOf("pdf") > -1) {
            setState({ error: false, loading: false, message: '' });
            setInputStatic((prevState) => ({
                ...prevState,
                file: e.target.files[0],
            }))
        }

    }

    const category = competition?.category ? competition.category : null
    let attachmentMsg
    if (category === 'CRYSTAL') {
        attachmentMsg = (
            <div className='my-3 mr-2'>
                <div>a. Kartu Pelajar/surat keterangan dari sekolah (masing-masing dari anggota tim)</div>
                <div>b. Pas foto (ukuran bebas)</div>
                <div>c. Surat Keterangan tidak mencontek (tempalte surat dapat diakses di: <a className='link link-info' href="https://bit.ly/SKETCRYSTAL23" target="_blank">https://bit.ly/SKETCRYSTAL23</a> )</div>
            </div>
        )
    }

    if (category === 'ISOTERM') {
        attachmentMsg = (
            <div className='my-3 mr-2'>
                <div>a. Kartu Tanda Mahasiswa (masing-masing dari anggota tim)</div>
                <div>b. Pas foto (ukuran bebas)</div>
            </div>
        )
    }

    if (!category) {
        <span>Upload identitas masing-masing anggota tim (KTP/Kartu Pelajar) dalam satu file dengan format (.pdf)</span>
    }


    const onChangeStatic = (e) => {
        setInputStatic((prevState) => ({
            ...prevState,
            teamName: e.target.value,
        }))
    }

    const [sendInvoice, { data: invoiceData, isLoading: isInvoiceLoading, isError: isInvoiceError, isSuccess: isInvoiceSuccess, error: invoiceError }] = useSendInvoceMutation()

    const [enrollTeam, { data: enrollData, isLoading: isEnrollLoading, isError: isEnrollError, error: enrollError, isSuccess: enrollSuccess }] = useEnrollCompetitionMutation()

    const competitionId = competition.id


    const onEnroll = async (e) => {
        e.preventDefault()
        const enrollData = {
            teamName: inputFieldStatic.teamName,
            file: inputFieldStatic.file,
            memberName: inputName
        }

        const enrollForm = new FormData()
        enrollForm.append('file', inputFieldStatic.file)
        enrollForm.append('teamName', enrollData.teamName)
        if (inputName.length !== 0) {
            inputName.forEach(name => enrollForm.append('memberName', name))
        }
        if (inputName.length === 0) {
            enrollForm.delete('memberName')
        }

        try {
            let enroll = await enrollTeam({ id: competition.id, body: enrollForm })

            if (isSendInvoice(competition.payment_method)) {
                let invoice = await sendInvoice(competition.id)
            }

            setState((prevState) => ({
                ...prevState,
                error: false,
                loading: false,
                success: true,
                message: "Berhasil bergabung dalam kompetitisi!"
            }))
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                error: true,
                loading: false,
                success: false,
                message: `Gagal menambahkan data ${error.message}`
            }))
        }


    }


    useEffect(() => {
        if (isEnrollError) console.log(enrollError)

        if (state.success) {
            navigate(`/competition/${competition.id}`, {
                state: {
                    notification: {
                        type: 'success',
                        message: 'Berhasil bergabung dalam kompetisi!'
                    }
                }
            })
        }

        if (isEnrollError || isInvoiceError) {
            navigate(`/competition/${competition.id}`, {
                state: {
                    notification: {
                        type: 'error',
                        message: "Terjadi kesalahan, silahkan daftar kembali"
                    }
                }
            })
        }

    }, [isEnrollError, enrollError, state.error, state.success, isInvoiceError, invoiceError])


    if (isEnrollError || isInvoiceLoading) {
        return <Spinner />
    }

    const memberNameFields = (input, index) => (
        <div className="grid mt-2 lg:grid-cols-6 lg:gap-4 form-control" key={index}>
            <label className="label col-span-1">
                <span className="label-text">Anggota {index + 2}</span>
            </label>
            <div className='input-group col-span-5'>
                <input type="text"
                    id='memberName'
                    name='memberName'
                    value={input}
                    onChange={event => onNameChange(index, event)}
                    placeholder={`Nama anggota tim ${index + 2}`}
                    className={`input input-bordered w-full`}
                    required={true} />
                <button className="btn btn-circle btn-error btn-outline" type='button' onClick={removeField}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </button>
            </div>

        </div>
    )

    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Daftar {competition.category}</h1>
            <h2 className='text-xl text-center lg:text-left'>{competition.title}</h2>
            <div className='pt-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <label className='font-semibold text-primary text-sm'>Masukkan Profil Tim</label>
                        <hr />
                        <form onSubmit={onEnroll}>
                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Ketua/Perwakilan</span>
                                </label>
                                <input type="text" placeholder={leader} className="input input-md input-ghost col-span-5" readOnly />
                            </div>

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                                <label className="label col-span-1">
                                    <span className="label-text">Nama Tim</span>
                                </label>
                                <input type="text"
                                    id='teamName'
                                    name='teamName'
                                    value={inputFieldStatic.teamName}
                                    onChange={onChangeStatic}
                                    placeholder="Nama Tim"
                                    required={true}
                                    className={`input input-bordered input-lg col-span-5`}
                                />
                            </div>



                            <div className="grid lg:grid-cols-1 lg:gap-4 form-control my-5">
                                <div className="alert alert-info text-white font-semibold">
                                    <span><FaUsers /> Anggota terdiri dari {competition.min_participant} - {competition.max_participant} orang (termasuk ketua).</span>
                                </div>
                            </div>


                            {inputName.map((input, index) => {
                                return (memberNameFields(input, index))
                            })}

                            <div className="flex justify-center">
                                <button type='button'
                                    onClick={addNewField}
                                    className="w-full btn btn-outline btn-success btn-md sm:btn-md md:btn-md lg:btn-md md:w-1/4 mt-5">Tambah Anggota</button>
                            </div>

                            <div className="grid lg:grid-cols-1 lg:gap-4 form-control mt-5">
                                <div className="alert shadow">
                                    <div>
                                        <div>

                                            <span className="font-bold">
                                                <AiOutlineInfoCircle className='text-2xl text-info mr-2 inline-block' />Persyaratan yang dimasukan kedalam file .pdf berupa:</span>
                                            <hr className='my-2' />
                                            <div className="text-s">{attachmentMsg}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-6 lg:gap-4 form-control items-center my-3">
                                <label className="label col-span-1">
                                    <span className="label-text">Maximal size: 2 MB</span>
                                </label>
                                <div className="col-span-5">
                                    <input type="file" placeholder="Upload file..." className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                                        required={true}
                                        onChange={onFileChange}
                                        accept="application/pdf" />
                                </div>

                            </div>
                            <div className="card-actions justify-end">
                                {!state.error ?
                                    <button type='submit' className="btn btn-primary">Daftar</button> :
                                    <button type='submit' className="btn btn-danger btn-disabled">{state.message}</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEnrollCompetition;