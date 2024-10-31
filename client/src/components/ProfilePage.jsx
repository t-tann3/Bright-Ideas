import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const { userId } = useParams();
    console.log("User ID from URL:", userId); // Debugging log

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8000/api/get/user/${userId}`)
                .then((res) => {
                    console.log("API Response:", res.data); // Log the full response
                    setUser(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user details", err);
                    setLoading(false);
                });
        } else {
            console.error("User ID is undefined.");
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    return (
        <>
        <div className="topNav">
        <Link to={`/ideas/${userId}`}>Bright Ideas</Link>
        <Link to="/">Logout</Link>
        </div>
    <h1>Profile Page</h1>
        <div>
            <h2>Name: {user.firstName}</h2>
            <h3>Alias: {user.alias}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Number of Posts:</strong> {Array.isArray(user.ideas) ? user.ideas.length : 0}</p>
            <p><strong>Total Number of Likes:</strong> {Array.isArray(user.likes) ? user.likes.length : 0}</p>
        </div>
</>
    );
};

export default ProfilePage;
