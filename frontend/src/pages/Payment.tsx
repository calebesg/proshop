import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { IStoreStates } from '../store'
import { savePaymentMethod } from '../store/modules/cart/actions'

function Payment() {
  const { shippingAddress } = useSelector((state: IStoreStates) => state.cart)

  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/resumo')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Forma de Pagamento</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Selecione o tipo de pagamento</Form.Label>

          <Form.Check
            type="radio"
            label="PayPal ou Cartão de Crédito"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type="radio"
            label="Boleto"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-5">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
