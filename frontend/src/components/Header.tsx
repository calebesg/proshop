import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to="/carrinho">
              <Nav.Link>
                <i className="fa fa-shopping-cart"></i> Carrinho
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fa fa-user"></i> Entrar
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
