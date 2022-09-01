import { Card } from 'react-bootstrap'
import Rating from './Rating'

interface IProductProps {
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

function Product({ product }: IProductProps) {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/produto/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/produto/${product._id}`} className="text-decoration-none">
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

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

export default Product
