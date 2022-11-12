import React from 'react';
import IsotermLogoImg from '../../../assets/img/logo-isoterm.png';
import { FaGoogleDrive } from 'react-icons/fa';

const DescriptionIsotermCompetition = () => {
    return (
        <section className="py-20 px-10 bg-base-100 lg:px-40">
            <div className="flex items-center">
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-3xl font-bold'>What is Isoterm Competition?</h1>
                    <div className="flex">
                        <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
                    </div>
                    <p>ISOTERM (Indonesia’s Innovative Research Competition) adalah kompetisi kimia untuk mahasiswa se-Indonesia. Kompetisi ini merupakan salah satu acara di OKTAN 2023. ISOTERM OKTAN 2023 bertujuan untuk memacu semangat berkarya keilmuan kimia bagi mahasiswa se-Indonesia.
                    </p>
                    <p className='mt-3 font-semibold'>
                        Untuk informasi lebih lanjut silahkan klik link dibawah ini:
                    </p>
                    <a href="https://bit.ly/GuidebookISOTERM2023" target={"_blank"} className='btn btn-ghost shadow-md mt-2'><FaGoogleDrive className='text-xl text-info' /></a>
                </div>
                <div className='hidden lg:block lg:w-1/2 pl-10 flex justify-center'>
                    <div className="card w-3/4 bg-base-100 shadow-xl">
                        <figure className="p-2">
                            <img src={IsotermLogoImg} alt="Crystal Competition ITB" className="rounded-xl w-full" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DescriptionIsotermCompetition;