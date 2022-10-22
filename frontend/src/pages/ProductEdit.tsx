import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { IStoreStates, productDetail } from '../store'

function ProductEdit() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productId = useParams().id

  const { loading, product, error } = useSelector((state: IStoreStates) => {
    return state.productDetail
  })

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(productDetail(productId))
      return
    }

    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setBrand(product.brand)
    setCategory(product.category)
    setCountInStock(product.countInStock)
    setDescription(product.description)
  }, [dispatch, navigate, productId, product])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to="/admin/produto" className="btn btn-light my-3">
        Voltar
      </Link>

      <FormContainer>
        <h1>Atualizar dados</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Seu Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entre com seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Informe o preço"
                value={price}
                onChange={e => setPrice(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL da imagem"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe a categoria"
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Stock disponível"
                value={countInStock}
                onChange={e => setCountInStock(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição do produto"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              className="my-4"
              style={{ width: '200px', height: '3rem' }}
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? <Loader size={20} /> : 'Atualizar'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEdit
