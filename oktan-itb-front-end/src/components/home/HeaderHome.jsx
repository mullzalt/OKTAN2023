import React from 'react';
import Background from '../../assets/img/background-itb.jpg';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

const HeaderHome = () => {
    return (
        <section className="hero min-h-screen" style={{ backgroundImage: `url(${Background})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <div className="flex justify-center my-4">
                        <img src={Logo} alt="" className='w-32' />
                    </div>
                    <h1 className="mb-5 text-4xl font-bold">OKTAN ITB 2023</h1>
                    <p className="mb-5 text-lg">“OKTAN ITB 2023 sebagai sarana kolaborasi dalam inovasi keilmuan kimia untuk pengembangan karya yang bermanfaat dan berkelanjutan bagi masyarakat”</p>
                    <Link to={"/register"} className="btn btn-primary">Register Now →</Link>
                </div>
            </div>
        </section>
    )
}

export default HeaderHome;