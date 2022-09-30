import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

import Message from '../components/Message'
import { IStoreStates, getOrderDetails } from '../store'
import Loader from '../components/Loader'

function Order() {
  const dispatch = useDispatch()

  const { order, error, loading } = useSelector(
    (state: IStoreStates) => state.orderDetails
  )

  const { id } = useParams()

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id))
    }
  }, [id, dispatch, order])

  const itemsPrice = useMemo(() => {
    return (
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0) ||
      0
    )
  }, [order?.orderItems])

  if (loading) return <Loader />

  if (error) return <Message variant="danger">{error}</Message>

  return (
    <>
      <h1>Compra - {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <h2>Entrega</h2>

              <strong>Nome: {order?.user.name}</strong>
              <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>

              <p>
                <strong>Endereço:</strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{' '}
                {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}
              </p>

              {order?.isDelivered ? (
                <Message variant="success">
                  Compra despachada - {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Não entregue</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metodo de Pagamento</h2>
              <p>
                <strong>Método:</strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">{order.paidAt}</Message>
              ) : (
                <Message variant="danger">Aguardando pagamento</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Itens da Compra</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Seu carrinho está vazio</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              rounded
                              fluid
                            />
                          </Col>

                          <Col>
                            <Link to={`/produto/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x R${item.price} ={' '}
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Sumario</h2>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Items</Col>
                  <Col>R$ {itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Frete</Col>
                  <Col>
                    {order?.shippingPrice === 0
                      ? 'Grátis'
                      : `R$ ${order?.shippingPrice.toFixed(2)}`}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Taxa</Col>
                  <Col>R$ {order?.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Total</Col>
                  <Col>R$ {order?.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order
