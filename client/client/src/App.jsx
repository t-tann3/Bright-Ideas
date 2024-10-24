import './App.css'
import {Route, Routes} from 'react-router-dom'
import Register from './views/Register.jsx'
import ProfilePage from './views/ProfilePage.jsx'
import PostDetails from './views/PostDetails.jsx'
import Feed from './views/Feed.jsx'
// import Login from './views/Login.jsx'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/profilepage/:id' element={<ProfilePage/>}/>
      <Route path='/postdetails' element={<PostDetails/>}/>
      <Route path='/ideas' element={<Feed/>}/>
    </Routes>

    </>
  )
}

export default App

