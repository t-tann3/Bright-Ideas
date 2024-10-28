import React, { useEffect, useState } from 'react';
import { useLocation, Link, matchPath, useParams} from 'react-router-dom';
import axios from 'axios'

const TopNav = (props) => {
    const location = useLocation();
    const { ideaId } = useParams();
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

    if (
        location.pathname === '/'
    ) {
        // Home page or ideas page
        content = (
            <>
                <h1>Welcome!</h1>
                <Link to="/">Logout</Link>
            </>
        );
    } else if (/^\/postdetails/.test(location.pathname) || location.pathname === `/profilepage/${userId}`) {
        // Matches any route that starts with /postdetails or is profile page
        content = (
            <>
                <Link to={`/ideas/${userId}`}>Bright Ideas</Link>
                <Link to="/">Logout</Link>
            </>
        );
    } else if(location.pathname === `/ideas/${userId}`){
        // Default or other pages
        content = (
            <>
                <h1>Hi {user ? user.alias : 'User'}!</h1>
                <Link to="/">Logout</Link>
            </>
        );
    }
    
    return (
        <>
            <div>
                {content}
            </div>
        </>
    );
};

export default TopNav;