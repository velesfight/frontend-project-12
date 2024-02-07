import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.jsx';
import MainPage from './Components/MainPage.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
