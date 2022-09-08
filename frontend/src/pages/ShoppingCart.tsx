import { useEffect } from 'react'
import { Link, useParams, useSearchParams, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { addToCart } from '../store'

function ShoppingCart() {
  const params = useParams()
  const [searchParams] = useSearchParams()

  const id = params.id
  const qty = searchParams.get('qty') || 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addToCart(id, +qty))
  }, [dispatch, id, qty])

  return (
    <div>
      <h1>MY Cart</h1>
    </div>
  )
}

export default ShoppingCart
