import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  IStoreStates,
  getUserDetail,
  updateUserProfile,
  getOrders,
} from '../store'
import { USER_UPDATE_PROFILE_RESET } from '../store/modules/user/constants'

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

  const {
    loading: loadingOrders,
    orders,
    error: errorOrders,
  } = useSelector((state: IStoreStates) => {
    return state.userOrders
  })

  const { userInfo: loggedUser } = useSelector((state: IStoreStates) => {
    return state.userLogin
  })

  const { userInfo: userUpdated } = useSelector((state: IStoreStates) => {
    return state.userUpdateProfile
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login')
      return
    }

    if (!userInfo || userUpdated) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(getUserDetail('profile'))
      dispatch(getOrders())
      return
    }

    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [navigate, loggedUser, userInfo, dispatch, userUpdated])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não iguais')
      return
    }

    dispatch(updateUserProfile({ id: userInfo?._id, name, email, password }))
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Meus Dados</h1>

        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {userUpdated && (
          <Message variant="success">Seus dados foram atualizados</Message>
        )}

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

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATA</th>
                <th>TOTAL</th>
                <th>PAGO</th>
                <th>ENTREGUE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Detalhes
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default Profile
