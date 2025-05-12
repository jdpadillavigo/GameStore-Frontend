import React, { useState } from 'react';
import './PaymentBlock.css';
import logo from '../../assets/images/logo.jpg';

const PaymentBlock: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handlePayment = () => {
    // Aquí puedes agregar la lógica para proceder con el pago
    alert('Pago realizado con éxito');
  };

  return (
    <div className="payment-block">
      <div className="payment-block__content">
        {/* Logo y Disclaimer */}
        <div className="payment-block__left">
          <img src={logo} alt="Logo" className="payment-block__logo" />
          <p className="payment-block__disclaimer">
            Al proceder con el pago, aceptas nuestros términos y condiciones.
          </p>
        </div>

        {/* Formulario de Pago */}
        <div className="payment-block__right">
          <h3>Información de Pago</h3>
          <form>
            <div className="payment-block__input-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="payment-block__input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
              />
            </div>

            <div className="payment-block__input-group">
              <label htmlFor="cardNumber">Número de Tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 1234 5678"
              />
            </div>

            <div className="payment-block__input-group">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
              />
              <label htmlFor="expiryDate">Fecha de Expiración</label>
              <input
                type="month"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            <button type="button" onClick={handlePayment} className="payment-block__confirm-button">
              Proceder con el Pago
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentBlock;
