import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import ProductCard from '../components/ProductCard'
import { ProductState } from '../reducers/productReducer'
import { listProducts } from '../actions/productActions'

interface IState {
  productList: ProductState
}

function Home() {
  const dispatch = useDispatch()
  const { error, loading, products } = useSelector((state: IState) => {
    return state.productList
  })

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  if (!products) return null

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
