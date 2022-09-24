import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import CheckoutSteps from '../components/CheckoutSteps'
import { IStoreStates } from '../store'
import Message from '../components/Message'

function PlaceOrder() {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state: IStoreStates) => state.cart
  )

  const itemsPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  }, [cartItems])

  const shippingPrice = useMemo(() => {
    return itemsPrice > 100 ? 0 : 100
  }, [itemsPrice])

  const taxPrice = useMemo(() => {
    return 0.15 * itemsPrice
  }, [itemsPrice])

  const totalPrice = useMemo(() => {
    return itemsPrice + shippingPrice + taxPrice
  }, [itemsPrice, shippingPrice, taxPrice])

  function placeOrderHandler() {
    console.log('Pedido Finalizado!')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Entrega</h2>
              <p>
                <strong>Endereço:</strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metodo de Pagamento</h2>
              <p>
                <strong>Método:</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Itens da Compra</h2>
              {cartItems.length === 0 ? (
                <Message>Seu carrinho está vazio</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => {
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
                    {shippingPrice === 0
                      ? 'Grátis'
                      : `R$ ${shippingPrice.toFixed(2)}`}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Taxa</Col>
                  <Col>R$ {taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Total</Col>
                  <Col>R$ {totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  style={{ width: '100%' }}
                  onClick={placeOrderHandler}
                >
                  Finalizar Pedido
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder
