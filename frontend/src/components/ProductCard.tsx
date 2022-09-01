import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import Rating from './Rating'

interface IProductCardProps {
  product: {
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
}

function ProductCard({ product }: IProductCardProps) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/produto/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/produto/${product._id}`} className="text-decoration-none">
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Avaliações`}
          />
        </Card.Text>

        <Card.Text as="h3" className="pt-3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
