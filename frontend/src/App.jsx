
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/Home';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const Navbar = () => (
  <nav>
   
        <Link to="/">Home</Link>
      
        <Link to="/books">Books</Link>
     
        <Link to="/register">Register</Link>
      
        <Link to="/login">Login</Link>
    
  </nav>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
