import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import api from '../libs/api'

import Rating from '../components/Rating'

interface IProduct {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

function Product() {
  const [product, setProduct] = useState<IProduct>({} as IProduct)

  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await api.get(`/api/product/${id}`)
      setProduct(response.data)
    }

    fetchProduct()
  }, [id])

  if (!product) return null

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
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
