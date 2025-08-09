import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Restaunt from './Restaunt';
import App2 from './App2';
import Menu from './Menu';
import Order from './Order';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<App2/>} />
      <Route path="/restaunt" element={<Restaunt />} />
      <Route path="/menu" element={<Menu />} />
      <Route path='/order' element={<Order/>} />
    </Routes>
  );
}
