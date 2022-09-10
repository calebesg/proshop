import { Col, Container, Row } from 'react-bootstrap'

interface IFormContainerProps {
  children: React.ReactNode
}

function FormContainer({ children }: IFormContainerProps) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
