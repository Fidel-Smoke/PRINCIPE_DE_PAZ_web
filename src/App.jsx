import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/Default/Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Index from './pages/Default/Index.jsx';
import Registro from './pages/Default/Registro.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
