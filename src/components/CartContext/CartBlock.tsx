import { useCart } from './useCart'; 
import './CartBlock.css';

const CartBlock = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return null;  // Si no hay juegos en el carrito, no mostrar el bloque
  }

  return (
    <div className="cart-block">
      <div className="cart-block__items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-block__item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-block__item__image"
            />
            <button
              onClick={() => removeFromCart(item.title)}
              className="cart-block__item__remove"
            >
              X
            </button>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="cart-block__actions">
        <button onClick={() => alert('Procediendo al pago...')} className="cart-block__action__confirm">
          Confirmar Orden
        </button>
        <button onClick={clearCart} className="cart-block__action__cancel">
          Cancelar Orden
        </button>
      </div>
    </div>
  );
};

export default CartBlock;
