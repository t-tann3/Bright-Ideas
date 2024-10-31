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
            <div className="container mt-5">
        <h1 className="mb-4">Post Details Page</h1>
        {idea ? (
            <div>
                {/* Display idea text */}
                <div className="border rounded p-3 mb-4 bg-light">
                    <p className="mb-0">{idea.text}</p>
                </div>
                
                <h3 className="mb-3">People who liked this post:</h3>
                {idea.likes.length > 0 ? (
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Alias</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {idea.likes.map((like) => (
                                <tr key={like._id}>
                                    <td>{like.alias}</td>
                                    <td>
                                        <Link to={`/profilepage/${like._id}`} className="text-decoration-none">
                                            {like.firstName}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">No likes yet.</p>
                )}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
        </>
    );
};

export default PostDetails;
