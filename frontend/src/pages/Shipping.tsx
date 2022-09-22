import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { IStoreStates } from '../store'
import { saveShippingAddress } from '../store/modules/cart/actions'

function Shipping() {
  const { shippingAddress } = useSelector((state: IStoreStates) => state.cart)

  const [address, setAddress] = useState(shippingAddress?.address)
  const [city, setCity] = useState(shippingAddress?.city)
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
  const [country, setCountry] = useState(shippingAddress?.country)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/pagamento')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Local de Entrega</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Seu endereço</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Endereço completo"
            value={address}
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="mt-2">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Cidade em que reside"
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="mt-2">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Código postal da sua cidade"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="mt-2">
          <Form.Label>País</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Seu país de origem"
            value={country}
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-5">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
