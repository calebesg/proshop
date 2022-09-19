import { useState, useEffect, FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { IStoreStates, register } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const { loading, userInfo, error } = useSelector((state: IStoreStates) => {
    return state.userRegister
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

    if (password !== confirmPassword) {
      setMessage('As senhas não iguais')
      return
    }

    dispatch(register(name, email, password))
  }

  return (
    <FormContainer>
      <h1>Cadastrar-se</h1>

      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Seu Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entre com seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className="py-3" controlId="password">
          <Form.Label>Confirme sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="****"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          className="my-4"
          style={{ width: '200px', height: '3rem' }}
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? <Loader size={20} /> : 'Cadastrar'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Já possui uma conta{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Entrar
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
