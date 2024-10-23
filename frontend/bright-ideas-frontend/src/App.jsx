import './App.css'
import {Router, Routes} from 'react-router-dom'
import RegisterAndLogin from './views/RegisterAndLogin.jsx'
import ProfilePage from './views/ProfilePage.jsx'
import PostDetails from './views/PostDetails.jsx'
import Feed from './views/Feed.jsx'


function App() {
  

  return (
    <>
    <Router>
      <Routes path='/registrationandlogin' element={<RegisterAndLogin/>}/>
      <Routes path='/profilepage/:id' element={<ProfilePage/>}/>
      <Routes path='/postdetails' element={<PostDetails/>}/>
      <Routes path='/ideas' element={<Feed/>}/>
    </Router>

    </>
  )
}

export default App

