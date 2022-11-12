import React from 'react';
import CrystalLogoImg from '../../../assets/img/logo-crystal.png';
import { FaGoogleDrive } from 'react-icons/fa';

const DescriptionCrystalCompetition = () => {
    return (
        <section className="py-20 px-10 bg-base-100 lg:px-40">
            <div className="flex items-center">
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-3xl font-bold'>What is Crystal Competition?</h1>
                    <div className="flex">
                        <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
                    </div>
                    <p>CRYSTAL (Chemistry Biggest National Competition) adalah kompetisi kimia untuk pelajar SMA/sederajat se-Indonesia. Kompetisi ini merupakan salah satu acara di OKTAN 2023. CRYSTAL OKTAN 2023 bertujuan untuk memacu semangat berkompetisi dan menguji keilmuan kimia pelajar SMA se-Indonesia.
                    </p>
                    <p className='mt-3 font-semibold'>
                        Untuk informasi lebih lanjut silahkan klik link dibawah ini:
                    </p>
                    <a href="http://bit.ly/GuidebookCRYSTAL2023" target={"_blank"} className='btn btn-ghost shadow-md mt-2'><FaGoogleDrive className='text-xl text-info' /></a>
                </div>
                <div className='hidden lg:block lg:w-1/2 pl-10 flex justify-center'>
                    <div className="card w-3/4 bg-base-100 shadow-xl">
                        <figure className="p-2">
                            <img src={CrystalLogoImg} alt="Crystal Competition ITB" className="rounded-xl w-full" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DescriptionCrystalCompetition;