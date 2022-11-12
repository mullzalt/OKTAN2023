import React from 'react';
import Background from '../../../assets/img/background-itb.jpg';

const HeaderCrystalCompetition = () => {
    return (
        <section className="hero h-80" style={{ backgroundImage: `url(${Background})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <h1 className="mb-5 text-5xl font-bold">Crystal Competition</h1>
            </div>
        </section>
    )
}

export default HeaderCrystalCompetition;