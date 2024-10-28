import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const PostDetails = () => {
    const [idea, setIdea] = useState(null);
    const { ideaId } = useParams();




    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/ideas/${ideaId}`)
            .then((res) => {
                console.log("res data", res.data)
                setIdea(res.data)
            })
            .catch((err) => {
                console.log("Error fetching post details", err)
            })
    }, [ideaId])
        


    return (
        <>
            <h1>Post Details Page</h1>
            {idea ? (
                <div>
                    <p>{idea.text}</p>
                    <h3>Likes:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {idea.likes.map((like) => (
                                <tr key={like._id}>
                                    <td>{like._id}</td>
                                    <td>{like.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default PostDetails