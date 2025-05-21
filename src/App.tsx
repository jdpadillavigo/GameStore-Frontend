import { Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Games from './pages/GameCatalog/GameCatalog'
import News from './pages/GamingNews/GamingNews'

import ContenidoNoticia from './pages/GamingNews/Content'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Verification from './pages/Confirmation/Confirmation'

import GameDetail from './pages/GameDetail/GameDetail';

import AdminUsers from './pages/AdminPages/Users/Users'
import AdminGames from './pages/AdminPages/Games/Games'
import AdminNews from './pages/AdminPages/News/News'
import AdminStats from './pages/AdminPages/Stats/Stats'

import Cart from './pages/Cart/Cart'
import PaymentBlock from './components/PaymentBlock/PaymentBlock'

import { GamesProvider } from './contexts/GamesContext';

import './App.css'

function App() {
  return (
    <div className="app-container">
      <GamesProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/juegos' element={<Games />} />
            <Route path='/noticias' element={<News />} />
            <Route path='/noticia/contenido' element={<ContenidoNoticia />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/restcontra' element={<ResetPassword />} />
            <Route path='/verificacion' element={<Verification />} />
            <Route path='/carrito' element={<Cart />} />
            <Route path='/pago' element={<PaymentBlock />} />
            <Route path="/juego/:gameId" element={<GameDetail />} />

            <Route path='/a/usuarios' element={<AdminUsers />} />
            <Route path='/a/juegos' element={<AdminGames />} />
            <Route path='/a/noticias' element={<AdminNews />} />
            <Route path='/a/estadisticas' element={<AdminStats />} />
          </Routes>
        </main>
      </GamesProvider>
    </div>
  )
}

export default App;
