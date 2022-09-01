import { Container, Navbar, Nav } from 'react-bootstrap'

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/carrinho">
              <i className="fa fa-shopping-cart"></i> Carrinho
            </Nav.Link>
            <Nav.Link href="/login">
              <i className="fa fa-user"></i> Entrar
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
