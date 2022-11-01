import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import { IStoreStates, listProducts } from '../store'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Home() {
  const params = useParams()
  const keyword = params.term || ''
  const page = params.page || 1

  const dispatch = useDispatch()
  const {
    error,
    loading,
    products,
    page: currentPage,
    totalPage,
  } = useSelector((state: IStoreStates) => {
    return state.productList
  })

  const { userInfo } = useSelector((state: IStoreStates) => {
    return state.userLogin
  })

  useEffect(() => {
    dispatch(listProducts(keyword, page))
  }, [dispatch, keyword, page])

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
      <Meta />

      {!keyword ? <ProductCarousel /> : <Link to="/">Voltar</Link>}

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

      <Paginate
        keyword={keyword}
        page={currentPage}
        totalPage={totalPage}
        isAdmin={userInfo?.isAdmin}
      />
    </>
  )
}

export default Home
