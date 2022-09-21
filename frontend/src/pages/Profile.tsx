import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { IStoreStates, getUserDetail } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'

function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const { loading, userInfo, error } = useSelector((state: IStoreStates) => {
    return state.userDetails
  })

  const { userInfo: loggedUser } = useSelector((state: IStoreStates) => {
    return state.userLogin
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login')
      return
    }
    if (!userInfo) {
      console.log(userInfo)
      dispatch(getUserDetail('profile'))
      return
    }

    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [navigate, loggedUser, userInfo, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não iguais')
      return
    }

    // dispatch(register(name, email, password))
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Meus Dados</h1>

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

          <Form.Group className="py-3" controlId="confirmPassword">
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
            {loading ? <Loader size={20} /> : 'Salvar Alterações'}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
}

export default Profile
