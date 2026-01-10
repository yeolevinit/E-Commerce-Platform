import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'motion/react';

import Categories from './pages/Categories';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import { getMe } from './store/slices/authSlice';

// Wrapper for animated routing
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg flex flex-col font-sans text-text-main">
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="!bg-card-bg !text-text-main"
        />
      </div>
    </Router>
  );
}

export default App;
