import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Default/index.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
