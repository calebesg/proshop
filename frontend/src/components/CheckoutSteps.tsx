import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

interface CheckoutStepsProps {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}

function CheckoutSteps({ step1, step2, step3, step4 }: CheckoutStepsProps) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/entrega">
            <Nav.Link>Entrega</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Entrega</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/pagamento">
            <Nav.Link>Pagamento</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pagamento</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/resumo">
            <Nav.Link>Resumo</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Resumo</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
