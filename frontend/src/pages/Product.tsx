import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { IStoreStates, productDetail } from '../store'

function Product() {
  const dispatch = useDispatch()
  const { error, loading, product } = useSelector((state: IStoreStates) => {
    return state.productDetail
  })

  const params = useParams()
  const id = params.id

  useEffect(() => {
    dispatch(productDetail(id))
  }, [id, dispatch])

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
    </>
  )
}

export default Product
