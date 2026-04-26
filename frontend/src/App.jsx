import React from 'react'
import Navbar from '../src/components/Navbar';
import Home from '../src/components/Home';
import Footer from '../src/components/Footer';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Blogs from '../src/pages/Blogs';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import Creators from '../src/pages/Creators';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import UpdateBlog from '../src/dashboard/UdateBlog'
import Detail from '../src/pages/Detail';
import NotFound from './pages/NotFound';
import CreatorProfile from '../src/pages/CreatorProfile';

function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname,
  );

  const {blogs, isAuthenticated, loading} = useAuth();
  // console.log("Blogs from context:", blogs);
  console.log(isAuthenticated);
  console.log(loading);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id"  element={<Detail />} />
        <Route path='/blog/update/:id' element={<UpdateBlog />} />
        <Route path="/user/:id" element={<CreatorProfile />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App
