import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from '../../contexts/GamesContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuarioLogueado');
  const isLogged = Boolean(usuario);
  const { games } = useGamesContext();

  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleRemove = (id: number) => {
    const updated = cart.filter((g: number) => g !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const handleClear = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const handleConfirm = () => {
    navigate('/pago');
  };

  if (!isLogged) {
    return (
      <div className="cart-message">
        <p>Debes iniciar sesión para ver el carrito.</p>
        <div className="cart-message-actions">
          <button onClick={() => navigate('/login')}>Iniciar sesión</button>
          <button onClick={() => navigate(-1)}>Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>No tienes juegos agregados.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((id: number) => {
              return (
                <div key={id} className="cart-item">
                  <img
                    src={games[id].images[1]}
                    alt={games[id].title}
                    className="cart-img"
                  />
                  <button className="remove-btn" onClick={() => handleRemove(id)}>✖</button>
                </div>
              );
            })}
          </div>

          <div className="cart-actions">
            <button className="cancel-btn" onClick={handleClear}>Cancelar Orden</button>
            <button className="confirm-btn" onClick={handleConfirm}>Confirmar Orden</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;