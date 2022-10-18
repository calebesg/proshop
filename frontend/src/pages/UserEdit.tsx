import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { IStoreStates, getUserDetail, updateUser } from '../store'
import { USER_UPDATE_RESET } from '../store/modules/user/constants'

function UserEdit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { loading, userInfo, error } = useSelector((state: IStoreStates) => {
    return state.userDetails
  })

  const userUpdate = useSelector((state: IStoreStates) => {
    return state.userUpdate
  })

  const userId = useParams().id

  const navigate = useNavigate()

  useEffect(() => {
    if (userUpdate.userInfo && userUpdate.userInfo?.email) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
      return
    }

    if (!userInfo || userInfo._id !== userId) {
      dispatch(getUserDetail())
      return
    }

    setName(userInfo.name)
    setEmail(userInfo.email)
    setIsAdmin(userInfo.isAdmin)
  }, [dispatch, userId, userInfo, userUpdate.userInfo, navigate])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Voltar
      </Link>

      <FormContainer>
        <h1>Atualizar dados</h1>

        {userUpdate.loading && <Loader />}
        {userUpdate.error && (
          <Message variant="danger">{userUpdate.error}</Message>
        )}

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

            <Form.Group controlId="email">
              <Form.Label>Seu e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-3" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Administrador"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEdit
