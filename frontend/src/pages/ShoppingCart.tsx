import { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { addToCart, IStoreStates, removeFromCart } from '../store'

function ShoppingCart() {
  const params = useParams()
  const [searchParams] = useSearchParams()

  const id = params.id
  const qty = searchParams.get('qty') || 1

  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: IStoreStates) => {
    return state.cart
  })

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(addToCart(id, +qty))
  }, [dispatch, id, qty])

  const handleRemoverFromCart = (productId: string) => {
    dispatch(removeFromCart(productId))
  }

  const handleCheckout = () => {
    navigate(`/login?redirect=entrega`)
  }

  return (
    <Row>
      <Col>
        <h1>Seu carrinho</h1>

        {cartItems.length === 0 ? (
          <Message>
            Seu carrinho está vazio! <Link to="/">Ir as compras</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(item => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/produto/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={e =>
                          dispatch(addToCart(item.product, +e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(value => {
                          return (
                            <option key={value} value={value + 1}>
                              {value + 1}
                            </option>
                          )
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={3}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleRemoverFromCart(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                items
              </h2>
              R${' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="bt-block"
                style={{ width: '100%' }}
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      {/* <Col></Col> */}
    </Row>
  )
}

export default ShoppingCart
