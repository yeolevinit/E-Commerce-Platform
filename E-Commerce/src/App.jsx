import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { getMe } from './store/slices/authSlice';



const Home = () => (
  <div className="flex flex-col items-center justify-center bg-black min-h-[60vh] text-center px-4">
    <h1 className="text-5xl font-extrabold text-[#3C3D37] bg-clip-text mb-6">
      Welcome to ShopMate
    </h1>
    <p className="text-xl text-[#3C3D37] max-w-2xl">
      Your one-stop destination for premium products. Experience shopping like never before.
    </p>
    <button className="mt-8 px-8 py-3 bg-[#3C3D37] text-white font-semibold rounded-full shadow-lg hover:bg-[#3C3D37] transition transform hover:-translate-y-1">
      Explore Now
    </button>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
