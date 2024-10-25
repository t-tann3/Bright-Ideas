import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const Feed = () => {
    const { userId } = useParams();
    const [newIdea, setNewIdea] = useState('') // for the input field
    const [ideas, setIdeas] = useState([]); // feed for the feed (array of ideas)


    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/`)
            .then((response) => {
                // console.log(response.data)
                setIdeas(response.data);
            })
            .catch((error) => {
                console.error('Error fetching ideas:', error);
            });
}, []);

    const makeNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            userId: userId,
            idea: {
                text: newIdea, // posts the idea entered by the user
                likes: [], // initializes likes with an empty array
            },
        };

        axios.post('http://localhost:8000/api/ideas', newPost)
            .then((res) => {
                console.log("Idea saved successfully", res.data);
                setIdeas([...ideas, res.data]);
                setNewIdea('');
            })
            .catch((err) => {
                console.log("Unable to save idea", err)
            })
            
    }
        return (
            <>
                {/* form to create new post */}
                <form onSubmit={makeNewPost}>
                    <label>New Idea: </label>
                    <input type="text" 
                    name="new-idea" 
                    value={newIdea}
                    onChange={e => setNewIdea(e.target.value)}
                    placeholder="Post something witty here..."
                    />
                    <button type="submit"> Idea! </button>
                </form>

                <h1>Feed</h1>
                <div>
                    {ideas.map((idea) => (
                        <div key={idea._id}>
                            <p>{idea.text}</p>
                            <Link to="/postdetails">
                            <p>Likes: {idea.likes.length}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </>
        )
    }

export default Feed;