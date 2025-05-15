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
import Confirmation  from './pages/Confirmation/Confirmation'
import GameDetail from './pages/GameDetail/GameDetail';

import Users from './pages/AdminPages/Users/Users'
import Games from './pages/AdminPages/Games/Games'
import News from './pages/AdminPages/News/News'
import Stats from './pages/AdminPages/Stats/Stats'

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
            <Route path='/confirmacion' element={<Confirmation />} />
            <Route path="/game/:gameId" element={<GameDetail />} />

            <Route path='/a/usuarios' element={<Users />} />
            <Route path='/a/juegos' element={<Games />} />
            <Route path='/a/noticias' element={<News />} />
            <Route path='/a/estadisticas' element={<Stats />} />
          </Routes>
        </main>
      </CartProvider>
    </div>
  )
}

export default App;
