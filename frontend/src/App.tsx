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
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import UserList from './pages/UserList'
import UserEdit from './pages/UserEdit'
import ProductList from './pages/ProductList'
import ProductEdit from './pages/ProductEdit'

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
            <Route path="/order/:id" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/entrega" element={<Shipping />} />
            <Route path="/pagamento" element={<Payment />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/usuario/:id/edit" element={<UserEdit />} />
            <Route path="/admin/produto" element={<ProductList />} />
            <Route path="/admin/produto/:id/edit" element={<ProductEdit />} />
            <Route path="/resumo" element={<PlaceOrder />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
