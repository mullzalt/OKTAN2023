import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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