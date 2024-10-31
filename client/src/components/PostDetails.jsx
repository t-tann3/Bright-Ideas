import { useParams, Link } from "react-router-dom"; // Import Link
import { useState, useEffect } from "react";
import axios from "axios";

const PostDetails = () => {
    const [idea, setIdea] = useState({ likes: [] });
    const { ideaId } = useParams();

    useEffect(() => {
        // Fetch the idea details
        axios
            .get(`http://localhost:8000/api/ideas/${ideaId}`)
            .then((res) => {
                console.log("API Response:", res.data); // Log the response for debugging

                // Assuming your API returns the structure with the idea directly
                const fetchedIdea = res.data; // Access the response directly

                // Set the state with fetched data
                setIdea({
                    text: fetchedIdea.text,
                    likes: fetchedIdea.likes || [], // Ensure likes is an array
                });
            })
            .catch((err) => {
                console.log("Error fetching post details", err);
            });
    }, [ideaId]);

    return (
        <>
            <h1>Post Details Page</h1>
            {idea ? (
                <div>
                    {/* Display idea text */}
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                        <p>{idea.text}</p>
                    </div>
                    
                    <h3>People who liked this post:</h3>
                    {idea.likes.length > 0 ? ( // Check if likes exist
                        <table>
                            <thead>
                                <tr>
                                    <th>Alias</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {idea.likes.map((like) => (
                                    <tr key={like._id}>
                                        <td>{like.alias}</td>
                                        {/* Link to the user's profile page */}
                                        <td>
                                            <Link to={`/profilepage/${like._id}`}>
                                                {like.firstName}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No likes yet.</p> // Fallback message if no likes exist
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default PostDetails;
