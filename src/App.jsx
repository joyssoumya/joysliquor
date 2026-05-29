import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AgeGate from './components/AgeGate';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Delivery from './pages/Delivery';
import About from './pages/About';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Footer from './components/Footer';

function AppContent() {
  const [verified, setVerified] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  if (!verified) return <AgeGate onVerify={() => setVerified(true)} />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {toast && <Toast message={toast} />}

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={(method) => {
            setCartOpen(false);
            navigate('/checkout', { state: { method } });
          }}
        />
      )}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={
            <Checkout cart={cart} total={cartTotal} onClearCart={clearCart} />
          } />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
