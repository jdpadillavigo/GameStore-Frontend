import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentBlock.css';

const PaymentBlock = () => {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber)) {
      setErrors('El número de tarjeta debe tener exactamente 16 dígitos.');
      return;
    }

    if (!expiryRegex.test(expiry)) {
      setErrors('La fecha debe tener el formato MM/AA y ser válida.');
      return;
    }

    if (!cvvRegex.test(cvv)) {
      setErrors('El CVV debe tener exactamente 3 dígitos.');
      return;
    }

    setErrors(null);
    setPaymentSuccess(true);
    localStorage.removeItem('cart');
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handlePay}>
        <h2>Pago Simulado</h2>

        <label>Nombre completo</label>
        <input type="text" required placeholder="Juan Pérez" />

        <label>Número de tarjeta</label>
        <input
          type="text"
          required
          maxLength={16}
          inputMode="numeric"
          pattern="\d*"
          placeholder="1234567812345678"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
        />

        <div className="payment-row">
          <div>
            <label>MM/AA</label>
            <input
              type="text"
              required
              maxLength={5}
              placeholder="12/26"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              required
              maxLength={3}
              inputMode="numeric"
              pattern="\d*"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        {errors && <p className="payment-error">{errors}</p>}

        <button type="submit">Realizar Pago</button>
      </form>

      {paymentSuccess && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h3>✅ Pago exitoso</h3>
            <p>¡Gracias por tu compra!</p>
            <button onClick={() => navigate('/')}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentBlock;
