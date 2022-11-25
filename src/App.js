import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './pages/Products/index';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';


function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div className='content'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/loginForm' element={<LoginForm/>}/>
            <Route path='/registerForm' exact element={<RegisterForm/>} />
            <Route path='/products'  element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
