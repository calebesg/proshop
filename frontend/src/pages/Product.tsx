import { useEffect, useState, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

import { IStoreStates, productDetail, createProductReview } from '../store'
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/modules/product/constants'

function Product() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const { error, loading, product } = useSelector((state: IStoreStates) => {
    return state.productDetail
  })

  const { userInfo } = useSelector((state: IStoreStates) => {
    return state.userLogin
  })

  const { error: errorReview, success: successReview } = useSelector(
    (state: IStoreStates) => {
      return state.productCreateReview
    }
  )

  const navigate = useNavigate()
  const params = useParams()
  const productId = params.id

  useEffect(() => {
    if (successReview) {
      alert('Comentário enviado!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(productDetail(productId))
  }, [productId, dispatch, successReview])

  const handleAddToCart = () => {
    navigate(`/carrinho/${productId}?qty=${qty}`)
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(createProductReview(productId, { rating, comment }))
  }

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center' }}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <Message variant="danger">{error}</Message>
  }

  return (
    <>
      <Meta title={product.name} />

      <Link className="btn btn-dark my-3" to="/">
        Voltar
      </Link>

      <Row className="mt-3">
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} Avaliações`}
              />
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              Preço: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item className="py-3 lh-lg">
              Descrição: {product.description}
            </ListGroup.Item>
          </ListGroup>
          <Card className="mt-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Preço: </Col>
                  <Col>
                    <strong className="fw-bold">${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={e => setQty(+e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(value => {
                          return (
                            <option key={value} value={value + 1}>
                              {value + 1}
                            </option>
                          )
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Estoque: </Col>
                  <Col>
                    {product.countInStock > 0 ? 'Disponível' : 'Indisponível'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  onClick={handleAddToCart}
                  className="btn-block"
                  style={{ width: '100%' }}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Adicionar ao Carrinho
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Avaliações</h2>

          {product.numReviews === 0 && (
            <Message>Seja o primeiro a avaliar este produto!</Message>
          )}

          <ListGroup variant="flush">
            {product.reviews.map(review => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h2>Escreva sua avaliação</h2>

              {errorReview && <Message variant="danger">{errorReview}</Message>}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Nota</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={e => setRating(+e.target.value)}
                    >
                      <option value="">Selecione...</option>
                      <option value="1">1 - Péssimo</option>
                      <option value="2">2 - Ruim</option>
                      <option value="3">3 - Bom</option>
                      <option value="4">4 - Muito Bom</option>
                      <option value="5">5 - Exelente</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Comentário</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Publicar avaliação
                  </Button>
                </Form>
              ) : (
                <Message>
                  Por favor <Link to="/login">entre com sua conta</Link> para
                  escrever uma avaliação
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Product
