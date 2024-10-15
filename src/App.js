import './App.css';
import { Route, Routes } from 'react-router-dom'
import NewInvoice from './invoices/pages/NewInvoice';
import Users from './user/pages/Users';
import AllInvoices from './invoices/pages/AllInvoices';
import Login from './shared/pages/Login';
import Navbar from './shared/navigation/Navbar'
import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './shared/context/auth-context';
import { Divider } from '@mui/material';
import Invoice from './invoices/pages/Invoice';
import VendorInvoices from './invoices/pages/VendorInvoices';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();


  const login = useCallback((name, role, token) => {
    setIsLoggedIn(true);
    setName(name);
    setRole(role);
    setToken(token);
    localStorage.setItem('userData', JSON.stringify({
      isLoggedIn, name, role, token
    }))
  })

  const logout = useCallback(() => {
    setIsLoggedIn();
    setName();
    setRole();
    setToken();
    localStorage.removeItem('userData');
  })

  useEffect(() => {
    const stordData = JSON.parse(localStorage.getItem('userData'));
    if (stordData && stordData.token) {
      login(stordData.name, stordData.role, stordData.token)
    }
  }, [login])

  return (
    <AuthContext.Provider value={{ isLoggedIn, name, role, token, login, logout }}>
      <Navbar token={token} ></Navbar>
      <Divider />
      <Routes>
        <Route path="/" element={<AllInvoices />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/invoices" element={<AllInvoices />}></Route>
        <Route path="/invoices/:invid" element={<Invoice />}></Route>
        <Route path="/invoices/vendor/:vendorname" element={<VendorInvoices />}></Route>
        <Route path="/invoices/new" element={<NewInvoice />}></Route>
        <Route path='/admin/vendors' element={<Users />}></Route>
      </Routes>
    </AuthContext.Provider >

  );
}

export default App;
