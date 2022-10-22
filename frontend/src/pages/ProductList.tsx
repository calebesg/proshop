import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  IStoreStates,
  listProducts,
  deleteProduct,
  createProduct,
} from '../store'
import { PRODUCT_CREATE_RESET } from '../store/modules/product/constants'

function ProductList() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state: IStoreStates) => state.userLogin)

  const { error, loading, products } = useSelector(
    (state: IStoreStates) => state.productList
  )

  const deletedProduct = useSelector(
    (state: IStoreStates) => state.productDelete
  )

  const createdProduct = useSelector(
    (state: IStoreStates) => state.productCreate
  )

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (createdProduct.product) {
      navigate(`/admin/produto/${createdProduct.product._id}`)
    }

    dispatch(listProducts())
  }, [
    dispatch,
    navigate,
    userInfo,
    deletedProduct.success,
    createdProduct.product,
  ])

  const deleteHandler = (productId: string) => {
    if (!window.confirm('Confimar remoção do Produto')) return
    console.log('hello')
    dispatch(deleteProduct(productId))
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Produtos</h1>
        </Col>
        <Col className="text-right d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Adicionar Produto
          </Button>
        </Col>
      </Row>

      {deletedProduct.loading && <Loader />}
      {deletedProduct.error && (
        <Message variant="danger">{deletedProduct.error}</Message>
      )}

      {createdProduct.loading && <Loader />}
      {createdProduct.error && (
        <Message variant="danger">{createdProduct.error}</Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>CATEGORIA</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/produto/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductList
