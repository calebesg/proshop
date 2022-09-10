import { useState, useEffect, FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { IStoreStates, login } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { loading, userInfo, error } = useSelector((state: IStoreStates) => {
    return state.userLogin
  })

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Login</h1>

      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Seu e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="py-3" controlId="password">
          <Form.Label>Sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="****"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          className="my-4"
          style={{ width: '200px', height: '3rem' }}
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? <Loader size={20} /> : 'Entrar'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Voçê é novo por aqui?{' '}
          <Link
            to={redirect ? `/registrar?redirect=${redirect}` : '/registrar'}
          >
            Cadastre-se
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login
