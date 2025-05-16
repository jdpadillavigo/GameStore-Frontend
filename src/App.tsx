import { Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import Categories from './pages/Categories/Categories'
import Platform from './pages/Platform/Platform'
import SpecialOffers from './pages/SpecialOffers/SpecialOffers'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Verification from './pages/Verification/Verification'
import GameDetail from './pages/GameDetail/GameDetail';

import { CartProvider } from './components/CartContext/CartContext';

import './App.css'

function App() {
  return (
    <div className="app-container">
      <CartProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/explorar' element={<Explore />} />
            <Route path='/categorias' element={<Categories />} />
            <Route path='/plataforma' element={<Platform />} />
            <Route path='/ofertas' element={<SpecialOffers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/restcontra' element={<ResetPassword />} />
            <Route path='/verificacion' element={<Verification />} />
            <Route path="/game/:gameId" element={<GameDetail />} />
          </Routes>
        </main>
      </CartProvider>
    </div>
  )
}

export default App;
