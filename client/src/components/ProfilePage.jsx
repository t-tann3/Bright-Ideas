import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        <div className="container mt-5">
        <h1 className="mb-4">Profile Page</h1>
        <div className="border rounded p-4 bg-light">
            <h2 className="mb-3">Name: {user.firstName}</h2>
            <h3 className="text-muted mb-3">Alias: {user.alias}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Number of Posts:</strong> {Array.isArray(user.ideas) ? user.ideas.length : 0}</p>
            <p><strong>Total Number of Likes:</strong> {Array.isArray(user.likes) ? user.likes.length : 0}</p>
        </div>
    </div>
    );
};

export default ProfilePage;
