import './App.css'
import {Route, Routes, Router} from 'react-router-dom'
import Register from './components/Register.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import PostDetails from './components/PostDetails.jsx'
import Feed from './components/Feed.jsx'



function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/profilepage/:userId' element={<ProfilePage/>}/>
      <Route path='/postdetails/:ideaId' element={<PostDetails/>}/>
      <Route path='/ideas/:userId' element={<Feed/>}/>
    </Routes>
    </>
  )
}

export default App

