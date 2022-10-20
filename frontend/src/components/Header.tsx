import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { IStoreStates, logout } from '../store'

function Header() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: IStoreStates) => state.userLogin)

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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/perfil">
                  <NavDropdown.Item>Meus dados</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-user"></i> Entrar
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Clientes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/produto">
                  <NavDropdown.Item>Produtos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
