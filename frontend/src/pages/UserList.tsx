import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { IStoreStates, listUsers, deleteUser } from '../store'

function UserList() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state: IStoreStates) => state.userLogin)

  const { error, loading, users } = useSelector(
    (state: IStoreStates) => state.listUsers
  )

  const { success: isDeletedUser } = useSelector(
    (state: IStoreStates) => state.deleteUser
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }
    dispatch(listUsers())
  }, [dispatch, navigate, isDeletedUser])

  const deleteHandler = (userId: string) => {
    if (!window.confirm('Confimar remoção do Usuário')) return
    dispatch(deleteUser(userId))
  }

  return (
    <>
      <h1>Clientes</h1>

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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/usuario/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
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

export default UserList
