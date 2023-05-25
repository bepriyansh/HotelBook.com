import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Hotels from './pages/Hotels/hotels'
import Users from './pages/Users/users'
import Dashboard from './pages/Dashboard/dashboard'
import Update from './pages/Update/update'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/hotels" element={<Hotels />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/hotels/update/:hotelId" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App