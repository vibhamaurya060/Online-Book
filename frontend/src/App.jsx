import React from 'react';
//import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
// import Order from './components/Order';
// import Review from './components/Review';
// import Swagger from './components/Swagger';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <header className="App-header">
    //       <h1>Online Bookstore</h1>
    //       <nav>
    //             <Link to="/">Home</Link>
             
    //             <Link to="/orders">Orders</Link>
             
    //             <Link to="/reviews">Reviews</Link>
              
    //             <Link to="/api-docs">API Docs (Swagger)</Link>
              
    //       </nav>
    //     </header>
    //     <main>
    //       <Routes>
    //         <Route path="/orders">
    //           <Order />
    //         </Route>
    //         <Route path="/reviews">
    //           <Review />
    //         </Route>
    //         <Route path="/api-docs">
    //           <Swagger />
    //         </Route>
    //         <Route path="/">
    //           <Home />
    //         </Route>
    //         </Routes>

    //     </main>
    //   </div>
    // </Router>
    <h2>Home</h2>
  );
}

function Home() {
  return <h2>Welcome to Online Bookstore!</h2>;
}

export default App;
