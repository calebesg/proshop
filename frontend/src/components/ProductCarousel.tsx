import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

import { listTopProducts, IStoreStates } from '../store'

function ProductCarousel() {
  const dispatch = useDispatch()

  const { error, loading, products } = useSelector(
    (state: IStoreStates) => state.productTopRated
  )

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  if (loading) return <Loader />

  if (error) return <Message variant="danger">{error}</Message>

  return (
    <Carousel pause="hover" className="bg-dark">
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/produto/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              {product.name} ({product.price})
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
