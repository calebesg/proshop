import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

function SearchBox() {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!keyword.trim()) {
      navigate('/')
      return
    }

    navigate(`/busca/${keyword}`)
  }

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Busque por um produto"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Buscar
      </Button>
    </Form>
  )
}

export default SearchBox
