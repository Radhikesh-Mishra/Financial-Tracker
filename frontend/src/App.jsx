import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Auth />} />
          <Route path="/dashboard" element={ <Dashboard />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
