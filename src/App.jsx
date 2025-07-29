import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Index from './pages/Default/Index.jsx';
import GestionEstudiantil from './pages/Default/GestionEstudiantil.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/GestionEstudiantil" element={<GestionEstudiantil />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
