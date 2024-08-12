import React from 'react';
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import UserHome from '../user/UserHome';
import AdminOperation from '../admin/AdminOperation';

function Main() {
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className='bg-black min-h-screen flex flex-col items-center justify-center gap-[50px]'>
      {isHome && (
        <>
          <Button className="w-[200px] h-[70px] mt-[100px]" variant="contained" component={NavLink} to="/user">
            User
          </Button>
          <Button className="w-[200px] h-[70px] mt-[20px]" variant="contained" component={NavLink} to="/admin">
            Admin
          </Button>
        </>
      )}

      <Routes>
        <Route path="/user" element={<UserHome />} />
        <Route path="/admin" element={<AdminOperation />} />
      </Routes>
    </div>
  );
}

export default Main;

