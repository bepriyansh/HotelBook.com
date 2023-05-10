import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/home'
import './App.css'
import Hotels from './pages/List/hotels'
import Hotel from './pages/Hotel/Hotel'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<Hotels/>}/>
      <Route path="/hotel/:id" element={<Hotel/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App