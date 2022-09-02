import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

import api from '../libs/api'

import ProductCard from '../components/ProductCard'

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

function Home() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/api/product')
      setProducts(response.data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Ultimos Produtos</h1>

      <Row>
        {products.map(product => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Home
