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

  const totalPrice = cart.reduce((acc, id) => acc + games[id]?.base_price || 0, 0);
  const totalDiscountedPrice = cart.reduce(
    (acc, id) => {
      const game = games[id];
      if (!game) return acc;
      const discountedPrice = game.base_price * (1 - game.discount / 100);
      return acc + discountedPrice;
    },
    0
  );

  if (!isLogged) {
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h3>🔒 Inicia sesión</h3>
        <p>Debes iniciar sesión para usar un carrito.</p>
        <button onClick={() => navigate('/login')}>Ir al login</button>
      </div>
    </div>
  );
}


  return (
    <div className='cart-page'>
      <div className="cart-container">
        <h2>Tu Carrito</h2>

        {cart.length === 0 ? (
          <p>No tienes juegos agregados.</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((id: number) => {
                const game = games[id];
                if (!game) return null;
                return (
                  <div key={id} className="cart-item">
                    <img
                      src={game.images[1]}
                      alt={game.title}
                      className="cart-img"
                    />
                    <button className="remove-btn" onClick={() => handleRemove(id)}>✖</button>
                  </div>
                );
              })}
            </div>

            <div className="cart-prices">
              <p className="price-normal">S/ Total {totalPrice.toFixed(2)}</p>
              <p className="price-discount">S/ Con Descuento {totalDiscountedPrice.toFixed(2)}</p>
            </div>


            <div className="cart-actions">
              <button className="cancel-btn" onClick={handleClear}>Vaciar Carrito</button>
              <button className="confirm-btn" onClick={handleConfirm}>Realizar Pago</button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  )
}

export default Cart;
