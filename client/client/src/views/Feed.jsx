import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const Feed = () => {
    const [user, setUser] = useState('');
    const [ideas, setIdeas] = useState('');
    const [post, setPost] = useState('');
    const [likes, setLike] = useState('');

    
    useEffect(() => {
        axios.get('http:localhost:8000/api/ideas')
            .then((response) => {
                console.log(response.data)
                setIdeas(response.data);
            })
            .catch((error) => {
                console.error('Error fetching ideas:', error);
            });
}, []);

    const makeNewPost = () => {
        
        const newPost = {
            user,
            post,
            likes
        };
    }
        axios.post('http://localhost:8000/api/ideas', newPost)

    return(
        <>
        <form>
            <input type="textarea" 
            name="new-post" 
            id="post"
            placeholder="Post something witty here..."
            />
            <button type="submit"> Idea! </button>
        </form>

        
        </>
    )
}

export default Feed 