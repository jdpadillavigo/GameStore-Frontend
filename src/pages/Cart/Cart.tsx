import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuarioLogueado');
  const isLogged = Boolean(usuario);

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const handleRemove = (id: number) => {
    const updated = cart.filter((g: number) => g !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.location.reload();
  };

  const handleClear = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  };

  const handleConfirm = () => {
    navigate('/payment');
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
            {cart.map((id: number) => (
              <div key={id} className="cart-item">
                <img
                  src={`/images/games/juego${id}.jpg`}
                  alt={`Juego ${id}`}
                  className="cart-img"
                />
                <button className="remove-btn" onClick={() => handleRemove(id)}>✖</button>
              </div>
            ))}
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