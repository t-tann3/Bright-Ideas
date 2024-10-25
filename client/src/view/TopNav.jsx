import React, { useState } from 'react';
import { useLocation, Link} from 'react-router-dom';
import axios from 'axios'


const TopNav = (props) => {
    const location = useLocation();
    let content;


    if (location.pathname === '/postdetails' || location.pathname === 'profilepage/:id') {
        content = (
            <>
            <Link to="/ideas">Bright Ideas</Link>
            <Link to="/">Logout</Link>
            </>
        )
    } else if (location.pathname === '/') {
        content = (
            <h1>Welcome!</h1>
        )
    } else if (location.pathname === '/ideas') {
        content = (
            <>
            <h1>Hi {}</h1>
            <Link to='/'>Logout</Link>
            </>
        )
    }
    

    return (
        <>
            <div className='nav'>
                <div/>

            </div>

        </>
    );
};

export default TopNav;