import './App.css'
import {Route, Routes} from 'react-router-dom'
import Register from './components/Register.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import PostDetails from './components/PostDetails.jsx'
import Feed from './components/Feed.jsx'
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

