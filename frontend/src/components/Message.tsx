import { Alert } from 'react-bootstrap'

interface IMessageProps {
  variant?: string
  children: React.ReactNode
}

function Message({ variant, children }: IMessageProps) {
  return <Alert variant={variant || 'info'}>{children}</Alert>
}

export default Message
