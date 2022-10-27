import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { IStoreStates, getOrderDetails, orderPay, orderDeliver } from '../store'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../store/modules/order/constants'
import api from '../libs/api'

function Order() {
  const [scriptReady, setScriptReady] = useState(false)

  const dispatch = useDispatch()

  const { order, error, loading } = useSelector(
    (state: IStoreStates) => state.orderDetails
  )

  const { userInfo } = useSelector((state: IStoreStates) => state.userLogin)

  const { loading: loadingPay, success: successPay } = useSelector(
    (state: IStoreStates) => state.orderPay
  )

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state: IStoreStates) => state.orderDeliver
  )

  const { id: orderId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await api.get('/api/config/paypal')

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setScriptReady(true)
      }

      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
      return
    }

    if (!order.isPaid) {
      // @ts-ignore: Unreachable code error
      !window.paypal && addPayPalScript()
      return
    }

    setScriptReady(true)
  }, [orderId, dispatch, order, successPay, successDeliver])

  const itemsPrice = useMemo(() => {
    return (
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0) ||
      0
    )
  }, [order?.orderItems])

  const successPaymentHandler = (paymentResult: any) => {
    console.log(paymentResult)
    dispatch(orderPay(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(orderDeliver(order))
  }

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

              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!scriptReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order?.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo?.isAdmin && order?.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Marcar como enviado
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order
