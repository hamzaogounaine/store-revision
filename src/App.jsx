import React from 'react'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import NavbarComponent from './Navbar'
import Home from './Home'
import NotFound from './NotFound'
import CartList from './Cart'
import ProductDetails from './Details'

const App = () => {
  return (
    <BrowserRouter >
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App