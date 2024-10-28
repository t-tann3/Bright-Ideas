import './App.css'
import {Route, Routes, Router} from 'react-router-dom'
import Register from './components/Register.jsx'
// import ProfilePage from './components/ProfilePage.jsx'
import PostDetails from './components/PostDetails.jsx'
import Feed from './components/Feed.jsx'
import TopNav from './view/TopNav.jsx'
// import Login from './views/Login.jsx'


function App() {
  

  return (
    <>
    <TopNav/>
    <Routes>
      <Route path='/' element={<Register/>}/>
      {/* <Route path='/profilepage/:id' element={<ProfilePage/>}/> */}
      <Route path='/postdetails/:ideaId' element={<PostDetails/>}/>
      <Route path='/ideas/:userId' element={<Feed/>}/>
    </Routes>
    </>
  )
}

export default App

