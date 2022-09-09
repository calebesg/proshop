import jwt from 'jsonwebtoken'

const generateToken = (id: string) => {
  const secret = process.env.TOKEN_SECRET as string

  return jwt.sign({ id }, secret, {
    expiresIn: '7d',
  })
}

export default generateToken
