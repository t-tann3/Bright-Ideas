import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const TopNav = () => {
    const location = useLocation();
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("Fetching user data for userId:", userId);
        if (userId) {
            axios
                .get(`http://localhost:8000/api/get/user/${userId}`)
                .then((res) => {
                    setUser(res.data);
                    console.log("User data fetched:", res.data);
                })
                .catch((err) => {
                    console.log("Error fetching user data", err);
                });
        }
    }, [userId]);

    console.log("Current Path:", location.pathname);
    console.log("User ID from URL:", userId);

    let content;

    if (location.pathname === '/') {
        content = (
            <>
                <h1>Welcome!</h1>
                <Link to="/">Logout</Link>
            </>
        );
    } else if (/^\/postdetails/.test(location.pathname) || location.pathname === `/profilepage/${userId}`) {
        content = (
            <>
                <Link to={`/ideas/${userId}`}>Bright Ideas</Link>
                <Link to="/">Logout</Link>
            </>
        );
    } else if (location.pathname === `/ideas/${userId}`) {
        content = (
            <>
                <h1>Hi {user ? user.alias : 'User'}!</h1>
                <Link to="/">Logout</Link>
            </>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default TopNav;
