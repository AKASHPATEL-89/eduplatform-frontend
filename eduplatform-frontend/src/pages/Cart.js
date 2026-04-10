import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const STEPS = ['Cart', 'Address', 'Payment', 'Confirmation'];

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: 'fas fa-mobile-alt', desc: 'Pay via Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'fas fa-credit-card', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: 'fas fa-university', desc: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'fas fa-money-bill-wave', desc: 'Pay when you receive' },
];

const parsePrice = (str) => {
  if (!str || str === 'Free') return 0;
  return parseInt(str.replace(/[₹,]/g, '')) || 0;
};

export default function Cart() {
  const { cart, removeFromCart, clearCart, placeOrder, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ name: '', phone: '', email: '', pincode: '', city: '', state: '', street: '', landmark: '' });
  const [payment, setPayment] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [bank, setBank] = useState('');
  const [errors, setErrors] = useState({});
  const [orderId] = useState(() => 'ORD' + Date.now());

  const subtotal = cart.reduce((sum, i) => sum + parsePrice(i.price), 0);
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal - discount;

  // ── Validation ──
  const validateAddress = () => {
    const e = {};
    if (!address.name.trim()) e.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone = 'Enter valid 10-digit mobile number';
    if (!/\S+@\S+\.\S+/.test(address.email)) e.email = 'Enter valid email';
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = 'Enter valid 6-digit pincode';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.state.trim()) e.state = 'State is required';
    if (!address.street.trim()) e.street = 'Street address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (payment === 'upi' && !/\S+@\S+/.test(upiId)) e.upi = 'Enter valid UPI ID (e.g. name@upi)';
    if (payment === 'card') {
      if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) e.cardNumber = 'Enter valid 16-digit card number';
      if (!cardDetails.name.trim()) e.cardName = 'Cardholder name required';
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) e.expiry = 'Enter expiry as MM/YY';
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) e.cvv = 'Enter valid CVV';
    }
    if (payment === 'netbanking' && !bank) e.bank = 'Select a bank';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && cart.length === 0) { showToast('Cart is empty!', 'error'); return; }
    if (step === 1 && !validateAddress()) return;
    if (step === 2) {
      if (!validatePayment()) return;
      placeOrder({ orderId, items: cart, address, payment, total });
      clearCart();
    }
    setStep(s => s + 1);
  };

  const addrField = (key, label, type = 'text', placeholder = '') => (
    <div className="cart-field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder || label}
        value={address[key]}
        onChange={e => setAddress(p => ({ ...p, [key]: e.target.value }))}
        className={errors[key] ? 'input-error' : ''}
      />
      {errors[key] && <span className="field-error">{errors[key]}</span>}
    </div>
  );

  const ImgWithFallback = ({ src, alt }) => {
    const [failed, setFailed] = React.useState(false);
    if (failed) return (
      <div style={{ width: 72, height: 72, borderRadius: 10, background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i className="fas fa-book" style={{ color: 'white', fontSize: 24 }} />
      </div>
    );
    return <img src={src} alt={alt} onError={() => setFailed(true)} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />;
  };

  return (
    <div className="cart-page">
      {/* Stepper */}
      <div className="cart-stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-circle">{i < step ? <i className="fas fa-check" /> : i + 1}</div>
              <span>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="cart-body">
        {/* ── STEP 0: Cart Review ── */}
        {step === 0 && (
          <div className="cart-section">
            <h2><i className="fas fa-shopping-cart" /> My Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <i className="fas fa-cart-plus" />
                <p>Your cart is empty</p>
                <button className="btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div className="cart-item-row" key={item.id}>
                    <ImgWithFallback src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.desc?.slice(0, 80)}...</p>
                      <div className="cart-item-price">
                        <span className="price-main">{item.price}</span>
                        {item.original && <span className="price-orig">{item.original}</span>}
                        {item.discount && <span className="price-disc">{item.discount}</span>}
                      </div>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                ))}
                <div className="cart-summary-box">
                  <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="summary-row green"><span>Discount (5%)</span><span>-₹{discount}</span></div>
                  <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP 1: Address ── */}
        {step === 1 && (
          <div className="cart-section">
            <h2><i className="fas fa-map-marker-alt" /> Delivery Address</h2>
            <div className="cart-form-grid">
              {addrField('name', 'Full Name', 'text', 'Enter your full name')}
              {addrField('phone', 'Mobile Number', 'tel', '10-digit mobile number')}
              {addrField('email', 'Email Address', 'email', 'your@email.com')}
              {addrField('pincode', 'Pincode', 'text', '6-digit pincode')}
              {addrField('city', 'City')}
              {addrField('state', 'State')}
              {addrField('street', 'Street / Area', 'text', 'House no, street, area')}
              {addrField('landmark', 'Landmark (optional)', 'text', 'Near school, temple...')}
            </div>
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div className="cart-section">
            <h2><i className="fas fa-lock" /> Payment Method</h2>
            <div className="payment-methods">
              {paymentMethods.map(m => (
                <label key={m.id} className={`payment-option ${payment === m.id ? 'selected' : ''}`}>
                  <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => { setPayment(m.id); setErrors({}); }} />
                  <i className={m.icon} />
                  <div>
                    <strong>{m.label}</strong>
                    <small>{m.desc}</small>
                  </div>
                </label>
              ))}
            </div>

            {payment === 'upi' && (
              <div className="payment-detail">
                <label>UPI ID</label>
                <input placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} className={errors.upi ? 'input-error' : ''} />
                {errors.upi && <span className="field-error">{errors.upi}</span>}
              </div>
            )}

            {payment === 'card' && (
              <div className="payment-detail cart-form-grid">
                <div className="cart-field span-2">
                  <label>Card Number</label>
                  <input placeholder="1234 5678 9012 3456" maxLength={19}
                    value={cardDetails.number}
                    onChange={e => setCardDetails(p => ({ ...p, number: e.target.value.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19) }))}
                    className={errors.cardNumber ? 'input-error' : ''} />
                  {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                </div>
                <div className="cart-field span-2">
                  <label>Cardholder Name</label>
                  <input placeholder="Name on card" value={cardDetails.name} onChange={e => setCardDetails(p => ({ ...p, name: e.target.value }))} className={errors.cardName ? 'input-error' : ''} />
                  {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                </div>
                <div className="cart-field">
                  <label>Expiry (MM/YY)</label>
                  <input placeholder="MM/YY" maxLength={5} value={cardDetails.expiry}
                    onChange={e => setCardDetails(p => ({ ...p, expiry: e.target.value.replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5) }))}
                    className={errors.expiry ? 'input-error' : ''} />
                  {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                </div>
                <div className="cart-field">
                  <label>CVV</label>
                  <input placeholder="CVV" maxLength={4} type="password" value={cardDetails.cvv} onChange={e => setCardDetails(p => ({ ...p, cvv: e.target.value }))} className={errors.cvv ? 'input-error' : ''} />
                  {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
              </div>
            )}

            {payment === 'netbanking' && (
              <div className="payment-detail">
                <label>Select Bank</label>
                <select value={bank} onChange={e => setBank(e.target.value)} className={errors.bank ? 'input-error' : ''}>
                  <option value="">-- Choose Bank --</option>
                  {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB', 'Bank of Baroda', 'Canara Bank'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.bank && <span className="field-error">{errors.bank}</span>}
              </div>
            )}

            {payment === 'cod' && (
              <div className="payment-detail cod-note">
                <i className="fas fa-info-circle" /> Cash on Delivery available. Pay ₹{total} when your order arrives.
              </div>
            )}

            {/* Order Summary */}
            <div className="cart-summary-box" style={{ marginTop: 24 }}>
              <h4 style={{ marginBottom: 12 }}>Order Summary</h4>
              {cart.map(i => <div className="summary-row" key={i.id}><span>{i.name}</span><span>{i.price}</span></div>)}
              <hr />
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="summary-row green"><span>Discount</span><span>-₹{discount}</span></div>
              <div className="summary-row total"><span>Total Payable</span><span>₹{total}</span></div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <div className="cart-section order-success">
            <div className="success-icon"><i className="fas fa-check-circle" /></div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you, <strong>{address.name}</strong>! Your order has been confirmed.</p>
            <div className="order-details-box">
              <div className="order-detail-row"><span>Order ID</span><strong>{orderId}</strong></div>
              <div className="order-detail-row"><span>Amount Paid</span><strong>₹{total}</strong></div>
              <div className="order-detail-row"><span>Payment</span><strong>{paymentMethods.find(m => m.id === payment)?.label}</strong></div>
              <div className="order-detail-row"><span>Deliver To</span><strong>{address.street}, {address.city}, {address.state} - {address.pincode}</strong></div>
            </div>
            <div className="success-actions">
              <button className="btn-primary" onClick={() => navigate('/')}>Go to Home</button>
              <button className="btn-outline" onClick={() => navigate('/products')}>Continue Shopping</button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 3 && (
          <div className="cart-nav-btns">
            {step > 0 && <button className="btn-outline" onClick={() => setStep(s => s - 1)}><i className="fas fa-arrow-left" /> Back</button>}
            <button className="btn-primary" onClick={handleNext}>
              {step === 2 ? <><i className="fas fa-lock" /> Place Order</> : <>Next <i className="fas fa-arrow-right" /></>}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-page { max-width: 780px; margin: 40px auto; padding: 0 16px 60px; }

        /* Stepper */
        .cart-stepper { display: flex; align-items: center; justify-content: center; margin-bottom: 36px; gap: 0; }
        .step-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .step-circle { width: 36px; height: 36px; border-radius: 50%; background: #e0e0e0; color: #888; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; transition: all .3s; }
        .step-item.active .step-circle { background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; }
        .step-item.done .step-circle { background: #28a745; color: #fff; }
        .step-item span { font-size: 12px; color: #888; font-weight: 500; }
        .step-item.active span { color: #667eea; font-weight: 700; }
        .step-line { flex: 1; height: 3px; background: #e0e0e0; min-width: 40px; transition: background .3s; }
        .step-line.done { background: #28a745; }

        /* Section */
        .cart-section { background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,.08); margin-bottom: 20px; }
        .cart-section h2 { font-size: 20px; font-weight: 700; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .cart-section h2 i { color: #667eea; }

        /* Cart Items */
        .cart-item-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
        .cart-item-info { flex: 1; }
        .cart-item-info h4 { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 4px; }
        .cart-item-info p { font-size: 12px; color: #888; margin-bottom: 6px; }
        .cart-item-price { display: flex; align-items: center; gap: 8px; }
        .price-main { font-weight: 700; color: #667eea; font-size: 15px; }
        .price-orig { font-size: 12px; color: #aaa; text-decoration: line-through; }
        .price-disc { font-size: 11px; background: #e8f5e9; color: #28a745; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
        .cart-remove-btn { background: none; border: none; color: #dc3545; cursor: pointer; font-size: 16px; padding: 8px; border-radius: 8px; transition: background .2s; }
        .cart-remove-btn:hover { background: #fff0f0; }

        /* Summary */
        .cart-summary-box { background: #f8f9ff; border-radius: 12px; padding: 16px 20px; margin-top: 16px; }
        .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; color: #555; }
        .summary-row.green span:last-child { color: #28a745; font-weight: 600; }
        .summary-row.total { font-size: 17px; font-weight: 700; color: #333; border-top: 2px solid #e0e0e0; margin-top: 8px; padding-top: 12px; }
        .cart-summary-box h4 { font-size: 15px; font-weight: 700; color: #333; }
        .cart-summary-box hr { border: none; border-top: 1px solid #e0e0e0; margin: 8px 0; }

        /* Empty */
        .cart-empty { text-align: center; padding: 40px 0; }
        .cart-empty i { font-size: 56px; color: #ddd; margin-bottom: 16px; display: block; }
        .cart-empty p { color: #888; margin-bottom: 20px; font-size: 16px; }

        /* Address Form */
        .cart-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cart-field { display: flex; flex-direction: column; gap: 6px; }
        .cart-field.span-2 { grid-column: span 2; }
        .cart-field label { font-size: 13px; font-weight: 600; color: #555; }
        .cart-field input, .cart-field select, .payment-detail input, .payment-detail select { padding: 10px 14px; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 14px; outline: none; transition: border .2s; font-family: inherit; }
        .cart-field input:focus, .payment-detail input:focus, .payment-detail select:focus { border-color: #667eea; }
        .input-error { border-color: #dc3545 !important; }
        .field-error { font-size: 11px; color: #dc3545; }

        /* Payment */
        .payment-methods { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .payment-option { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border: 2px solid #e0e0e0; border-radius: 12px; cursor: pointer; transition: all .2s; }
        .payment-option input { display: none; }
        .payment-option i { font-size: 22px; color: #667eea; width: 28px; text-align: center; }
        .payment-option div { display: flex; flex-direction: column; }
        .payment-option strong { font-size: 14px; color: #333; }
        .payment-option small { font-size: 12px; color: #888; }
        .payment-option.selected { border-color: #667eea; background: #f0f2ff; }
        .payment-detail { margin-top: 4px; display: flex; flex-direction: column; gap: 8px; }
        .payment-detail label { font-size: 13px; font-weight: 600; color: #555; }
        .payment-detail input, .payment-detail select { width: 100%; box-sizing: border-box; }
        .cod-note { background: #fff8e1; border: 1px solid #ffe082; border-radius: 10px; padding: 14px 18px; color: #795548; font-size: 14px; flex-direction: row; align-items: center; gap: 10px; }
        .cod-note i { color: #f59e0b; }

        /* Success */
        .order-success { text-align: center; padding: 20px; }
        .success-icon i { font-size: 72px; color: #28a745; margin-bottom: 16px; }
        .order-success h2 { font-size: 26px; color: #28a745; margin-bottom: 10px; }
        .order-success p { color: #555; font-size: 15px; margin-bottom: 24px; }
        .order-details-box { background: #f8f9ff; border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 28px; }
        .order-detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #555; }
        .order-detail-row:last-child { border: none; }
        .success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* Buttons */
        .cart-nav-btns { display: flex; justify-content: space-between; margin-top: 8px; gap: 12px; }
        .btn-primary { background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; border: none; padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: opacity .2s; }
        .btn-primary:hover { opacity: .9; }
        .btn-outline { background: #fff; color: #667eea; border: 2px solid #667eea; padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all .2s; }
        .btn-outline:hover { background: #f0f2ff; }

        @media (max-width: 600px) {
          .cart-form-grid { grid-template-columns: 1fr; }
          .cart-field.span-2 { grid-column: span 1; }
          .cart-stepper { gap: 0; }
          .step-line { min-width: 20px; }
          .step-item span { font-size: 10px; }
        }
      `}</style>
    </div>
  );
}
