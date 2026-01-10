import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import Header from './components/Header.jsx'
import Hero from './components/hero.jsx'
import Product from './components/Product.jsx'
import Claims from './components/Claims.jsx'
import Categories from './pages/Categories.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Hero />
      <Product />
      <Claims />
    </BrowserRouter>
  </StrictMode>,
)
