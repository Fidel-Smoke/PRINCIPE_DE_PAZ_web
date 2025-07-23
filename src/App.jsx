import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Index from './pages/Default/Index.jsx';
import Crud from './pages/Default/Crud.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Crud" element={<Crud />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
