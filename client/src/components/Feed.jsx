import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
    const { userId } = useParams();
    const [newIdea, setNewIdea] = useState(''); // For the input field
    const [ideas, setIdeas] = useState([]); // Array of ideas
    const [alias, setAlias] = useState([]);

    // Fetches user info for displaying next to each idea
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/get/user/${userId}`)
            .then((res) => {
                setAlias(res.data);
            })
            .catch((err) => {
                console.log('Unable to get logged in user', err);
            });
    }, [userId]);

    // Fetch the feed of ideas
    const fetchIdeas = () => {
        axios
            .get(`http://localhost:8000/api/ideas/`)
            .then((response) => {
                setIdeas(response.data);
            })
            .catch((error) => {
                console.error('Error fetching ideas:', error);
            });
    };

    // Call fetchIdeas once when the component mounts
    useEffect(() => {
        fetchIdeas();
    }, []);

    // Post a new idea
    const makeNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            userId,
            idea: {
                text: newIdea, // Posts the entered idea text
                likes: [], // Initializes likes with an empty array
            },
        };

        // Send new post to the backend array of ideas
        axios
            .post('http://localhost:8000/api/ideas', newPost)
            .then((res) => {
                console.log("Idea saved successfully", res.data);
                setNewIdea(''); // Clear the input field
                setIdeas([...ideas, res.data]); // Add the new idea to the existing ideas without refetching
            })
            .catch((err) => {
                console.log("Unable to save idea", err);
            });
    };

    const likeIdea = (ideaId) => {
        axios
            .post(`http://localhost:8000/api/ideas/${userId}/${ideaId}/like`, { likerId: userId }) // Send likerId of the current user
            .then((res) => {
                // Update the likes count in state
                setIdeas(ideas.map(idea =>
                    idea._id === ideaId ? { ...idea, likes: res.data.likes } : idea
                ));
            })
            .catch((err) => {
                console.error("Unable to like idea", err);
            });
    };
    
    // Delete an idea
    const deleteIdea = (ideaId) => {
        axios
            .post(`http://localhost:8000/api/deleteIdea`, { ideaId, userId })
            .then((res) => {
                console.log("Idea deleted successfully");
                // Filter out the deleted idea from the ideas state
                setIdeas(ideas.filter((idea) => idea._id !== ideaId));
            })
            .catch((err) => {
                console.error("Unable to delete idea", err);
            });
    };

    return (
        <>
            {/* Form to create new post */}
            <form onSubmit={makeNewPost}>
                <label>New Idea: </label>
                <input 
                    type="text"
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="Post something witty here..."
                />
                <button type="submit"> Idea! </button>
            </form>

            <h1>Feed</h1>
            <div>
                {ideas.map((idea) => (
                    <div key={idea._id}>
                        <p>{idea.text}</p>
                        <p>{idea.userAlias}</p>
                        <Link to={`/postdetails/${idea._id}`}>
                            <p>Likes: {idea.likes.length}</p>
                        </Link>
                        <button onClick={() => likeIdea(idea._id)}>Like</button>
                        {String(idea.userId) === String(userId) && (
                            <button onClick={() => deleteIdea(idea._id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Feed;
