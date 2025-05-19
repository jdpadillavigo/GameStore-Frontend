import './PaymentBlock.css';
import { useNavigate } from 'react-router-dom';

const PaymentBlock = () => {
  const navigate = useNavigate();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Pago simulado exitoso. ¡Gracias por tu compra!');
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h2>Pago Simulado</h2>
      <form className="payment-form" onSubmit={handlePay}>
        <label>Nombre completo</label>
        <input type="text" required placeholder="Juan Pérez" />

        <label>Número de tarjeta</label>
        <input type="text" required placeholder="1234 5678 9012 3456" />

        <div className="payment-row">
          <div>
            <label>MM/AA</label>
            <input type="text" required placeholder="12/26" />
          </div>
          <div>
            <label>CVV</label>
            <input type="text" required placeholder="123" />
          </div>
        </div>

        <button type="submit">Realizar Pago</button>
      </form>
    </div>
  );
};

export default PaymentBlock;