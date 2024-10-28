import React, { useEffect, useState } from 'react';
import { useLocation, Link, matchPath} from 'react-router-dom';
import axios from 'axios'


const TopNav = (props) => {
    const location = useLocation();
    const [user, setUser] = useState('')
    const match = matchPath('/ideas/:userId', location.pathname);
    const userId = match ? match.params.userId : null;
    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8000/api/get/user/${userId}`)
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log("Error fetching user data", err)
                })
        }
    }, [userId])

    let content;
    if (location.pathname === '/postdetails' || location.pathname === `/profilepage/${userId}`) {
        content = (
            <>
            <Link to={`/ideas/${userId}`}>Bright Ideas</Link>
            <Link to="/">Logout</Link>
            </>
        )
    } else if (location.pathname === '/') {
        content = (
            <h1>Welcome!(top nav)</h1>
        )
    } else if(location.pathname === `/ideas/${userId}`) {
        content = (
            <> 
                <h1>Hi {user ? user.alias : 'User'}</h1>
                <Link to='/'>Logout</Link>
            </> 
        )
    }
    

    return (
        <>
            <div className='navleft'>
                {content}
            </div>
        </>
    );
};

export default TopNav;