import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ProductState, listProducts } from '../store'

interface IStoreStates {
  productList: ProductState
}

function Home() {
  const dispatch = useDispatch()
  const { error, loading, products } = useSelector((state: IStoreStates) => {
    return state.productList
  })

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

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
      <h1>Ultimos Produtos</h1>

      <Row>
        {products?.map(product => {
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
