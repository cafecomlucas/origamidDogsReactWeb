import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import './App.css';
import { UserContextStorage } from './UserContext';
import Account from './Components/Account/Account';

const App = () => {
  return (
    <BrowserRouter>
      <UserContextStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="account" element={<Account />} />
        </Routes>
        <Footer />
      </UserContextStorage>
    </BrowserRouter>
  );
};

export default App;
