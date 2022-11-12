import React from 'react';
import { RiInstagramFill, RiYoutubeFill, RiLinkedinBoxFill, RiTwitterFill, RiFacebookBoxFill } from 'react-icons/ri';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-primary text-base-100 lg:px-40">
            <div className="flex items-center justify-self-center lg:justify-self-start">
                <p className='font-bold'>Copyright © 2022 Oktan ITB</p>
            </div>
            <div className="grid-flow-col justify-self-center md:place-self-center md:justify-self-end">
                <a href="https://www.instagram.com/oktanitb/" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <RiInstagramFill className='text-2xl' />
                </a>
                <a href="https://www.youtube.com/channel/UCCVXD3CSaVIHQdNLMXJHLlw" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <RiYoutubeFill className='text-2xl' />
                </a>
                <a href="https://www.linkedin.com/company/oktan-itb" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <RiLinkedinBoxFill className='text-2xl' />
                </a>
                <a href="https://mobile.twitter.com/itboktan" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <RiTwitterFill className='text-2xl' />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100017407802799&_rdc=1&_rdr" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <RiFacebookBoxFill className='text-2xl' />
                </a>
                <a href="https://www.tiktok.com/@oktanitb?is_from_webapp=1&sender_device=pc" target="_blank" className='btn btn-ghost btn-circle shadow-md'>
                    <FaTiktok className='text-xl' />
                </a>
            </div>
        </footer>
    )
}

export default Footer;