import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admRoot@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Maria Martins',
    email: 'mariamartins@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Calebe Guimarães',
    email: 'calebesg@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
