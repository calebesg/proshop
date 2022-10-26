import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { IStoreStates, getOrdersAdmin } from '../store'

function OrderList() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state: IStoreStates) => state.userLogin)

  const { loading, error, orders } = useSelector(
    (state: IStoreStates) => state.adminOrders
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }
    dispatch(getOrdersAdmin())
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUÁRIO</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGO</th>
              <th>ENVIADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}/`}>
                      <Button variant="light" className="btn-sm">
                        Detalhes
                      </Button>
                    </LinkContainer>
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

export default OrderList
