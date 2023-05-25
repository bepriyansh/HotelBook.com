import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import './App.css'
import Hotels from './pages/List/hotels'
import Hotel from './pages/Hotel/Hotel'
import Login from './pages/Login/login'
import User from './pages/User/user'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<Hotel />} />

        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App