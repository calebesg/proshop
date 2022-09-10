import { Spinner } from 'react-bootstrap'

interface ILoaderProps {
  size?: number
}

function Loader({ size = 100 }: ILoaderProps) {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Buscando...</span>
    </Spinner>
  )
}

export default Loader
