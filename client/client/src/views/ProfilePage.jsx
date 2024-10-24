import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"


const ProfilePage = () => {
    const { id } = useParams('');
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [posts, setPosts] = useState('');
    const [likes, setLikes] = useState('');


    useEffect(() => {
        axios.get(`http:localhost:8000/api/profilepage/${id}`)
            .then((response) => {
                
            })
    })
    
    
    
    
    return (
        <>
        
        
        
        
        
        
        
        
        
        </>
    )
}

export default ProfilePage;