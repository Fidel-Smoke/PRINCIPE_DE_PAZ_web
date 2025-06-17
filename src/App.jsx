import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Default/index.jsx';
import './App.scss';
import Login from './pages/Default/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
