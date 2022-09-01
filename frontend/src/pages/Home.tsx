import { Col, Row } from 'react-bootstrap'

import Product from '../components/Product'

import products from '../products'

function Home() {
  return (
    <>
      <h1>Ultimos Produtos</h1>

      <Row>
        {products.map(product => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Home
