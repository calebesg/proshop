import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import ShoppingCart from './pages/ShoppingCart'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'

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
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/pagamento" element={<Payment />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
