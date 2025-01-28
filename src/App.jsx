import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import './App.css';
import { ContextStorage } from './ContextUser';

const App = () => {
  return (
    <BrowserRouter>
      <ContextStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
        </Routes>
        <Footer />
      </ContextStorage>
    </BrowserRouter>
  );
};

export default App;
