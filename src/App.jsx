import { useState } from 'react'
import './App.css'
// import Flashcard from './components/FlashCard/FlashCard'
// import UserHome from './components/frontend/user/UserHome'
// import AdminOperation from './components/frontend/admin/adminOperation'
import LoginPage from '../src/components/frontend/loginPage/LoginPage' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LoginPage/>
    </>
  )
}

export default App
