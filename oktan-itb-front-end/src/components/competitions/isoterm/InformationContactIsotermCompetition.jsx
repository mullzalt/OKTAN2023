import React from 'react';
import { RiWhatsappFill, RiLineFill } from 'react-icons/ri';

const InformationContactIsotermCompetition = () => {
    return (
        <section className="py-20 px-10 bg-base-100 lg:px-40">
            <h1 className='text-left md:text-center text-3xl font-bold'>Information Contact</h1>
            <div className="flex md:justify-center">
                <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
            </div>
            <div className="flex justify-center">
                <p className='w-full text-left md:w-1/2 md:text-center'>Jika Anda ingin mengetahui informasi lebih lanjut mengenai kompetisi Isoterm ini bisa hubungi akun sosial media yang telah disediakan.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Wira Wisnanta</h2>
                        <p className='text-gray-500'>Informan Isoterm</p>
                        <div className="card-actions my-3">
                            <a href="https://api.whatsapp.com/send?phone=628980550226" target={"_blank"} className='btn btn-ghost btn-circle shadow-md'>
                                <RiWhatsappFill className='text-2xl text-accent' />
                            </a>
                            <a href="http://line.me/ti/p/~wirawisnanta" target={"_blank"} className='btn btn-ghost btn-circle shadow-md'>
                                <RiLineFill className='text-2xl text-success' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InformationContactIsotermCompetition;