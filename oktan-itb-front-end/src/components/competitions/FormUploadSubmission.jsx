import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config';


const FormUploadSubmission = ({ myData, userData, competiton, paper }) => {
    const { id } = useParams()

    const [state, setState] = useState({
        error: false,
        loading: false,
        message: ''
    })

    const [submission, setSubmission] = useState({
        title: '',
        theme: '',
        mentor: '',
        mentor_id_number: '',
        file: {}
    })

    const navigate = useNavigate()
    let token = userData.token

    const submissionApi = async (id, token, FormData) => {
        setState((prevState) => ({
            ...prevState,
            error: false,
            loading: true
        }))
        await axios.post(`${API_URL}/v1/competitions/${id}/participants/${myData.memberId}/submit`, FormData, {
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

                navigate('/home', {
                    state: {
                        notification: {
                            message: "Upload abstrak berhasil!",
                            type: 'success'
                        }
                    }
                })


            }))
            .catch((err) => {
                setState((prevState) => ({
                    ...prevState,
                    error: true,
                    loading: false
                }))

                navigate('/home', {
                    state: {
                        notification: {
                            message: `Terjadi kesalahan saat menambahkan data: ${err.message}`,
                            type: 'error'
                        }
                    }
                })
            })
    }

    const subThemes = (value, index) => (
        <option key={index} value={value}>{value}</option>

    )


    const onFileChange = (e) => {
        let size_limit = 4 * 1024 * 1024
        let filename = e.target.files[0].name
        let filesize = e.target.files[0].size
        let filetype = e.target.files[0].type

        let isLarger = filesize > size_limit ? true : false
        let ext = filename.match(/\.([^\.]+)$/)[1]

        if (isLarger) {
            setState((prevState) => ({ ...prevState, error: true, loading: false, message: 'File can not exceed 4MB!' }));
            return
        }

        if (typeof filename === "undefined" || ext.indexOf("pdf") < 0) {
            setState((prevState) => ({ ...prevState, error: true, loading: false, message: 'Only upload .pdf!' }));
            return
        }

        if (ext.indexOf("pdf") > -1) {
            setState({ error: false, loading: false, message: '' });
            setSubmission((prevState) => ({
                ...prevState,
                file: e.target.files[0],
            }))
        }

    }

    const onSelectChange = (e) => {
        e.preventDefault()
        setSubmission((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const submissionForm = new FormData()
        submissionForm.append('title', submission.title)
        submissionForm.append('theme', submission.theme)
        submissionForm.append('mentor', submission.mentor)
        submissionForm.append('mentor_id_number', submission.mentor_id_number)
        submissionForm.append('file', submission.file)

        await submissionApi(id, token, submissionForm)
    }

    return (
        <div className='pt-5 w-full lg:w-1/2 px-4'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <label className='font-semibold text-primary text-sm'>Upload Abstrak</label>
                        <hr className='my-1' />

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Judul Abstrak/Karya Ilmiah</span>
                            </label>
                            <input
                                name='title'
                                value={submission.title}
                                type="text"
                                placeholder="Judul Abstrak/Karya Ilmiah"
                                onChange={onSelectChange}
                                className="input input-bordered"
                                required={true} />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sub Tema</span>
                            </label>
                            <select className="select select-bordered" onChange={onSelectChange} name="theme">
                                <option selected={true} disabled>Pilih sub tema</option>
                                {competiton.competition_sub_themes.map((v, i) => {
                                    return (subThemes(v.name, i))
                                })}
                            </select>
                        </div>

                        <hr className='my-2' />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Dosen/Pembimbing</span>
                            </label>
                            <input
                                name='mentor'
                                value={submission.mentor}
                                type="text"
                                placeholder="Nama Dosen/Pembimbing"
                                onChange={onSelectChange}
                                className="input input-bordered"
                                required={true} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nomor Induk Dosen/Pembimbing</span>
                            </label>
                            <input
                                name='mentor_id_number'
                                pattern="[0-9]*"
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                value={submission.mentor_id_number}
                                type="text"
                                placeholder="Nomor Induk Dosen/Pembimbing (number only)"
                                onChange={onSelectChange}
                                className="input input-bordered"
                                required={true} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Abstrak/Karya Ilmiah + keterangan dosen(.pdf) MAX: 4 MB</span>
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
                                <button type='submit' className="btn btn-primary">UPLOAD</button> :
                                <button type='submit' className="btn btn-danger btn-disabled">{state.message}</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormUploadSubmission;