import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import ShoppingCart from './pages/ShoppingCart'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<Product />} />
            <Route path="/carrinho" element={<ShoppingCart />}>
              <Route path="/carrinho/:id" element={<ShoppingCart />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
