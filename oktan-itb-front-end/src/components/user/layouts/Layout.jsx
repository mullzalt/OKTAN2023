import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from './Breadcrumb';




const Layout = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setTheme(theme);
    }, []);

    return (
        <React.Fragment>
            <div data-theme={theme}>
                <div className="drawer drawer-mobile bg-base drop-shadow">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Navbar setTheme={setTheme} theme={theme} />
                        <div className="p-5 min-h-screen">
                            <ToastContainer
                                autoClose={3000}
                            />
                            {children}
                        </div>
                        <Footer />
                    </div>
                    <Sidebar />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;